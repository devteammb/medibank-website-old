"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Copy } from "lucide-react";
import CreatePasswordForm from "@/components/auth/CreatePasswordForm";

function StatusInner() {
  const searchParams = useSearchParams();

  const merchantTxnNo = searchParams.get("merchantTxnNo") || "";
  const transaction_id = searchParams.get("transaction_id") || "";
  const callbackError = searchParams.get("error") || "";
  const callbackState = searchParams.get("paymentState") || "";
  const paymentStatus = searchParams.get("paymentStatus") || "";
  const callbackHashStatus = searchParams.get("callbackHashStatus") || "";
  const normalizedPaymentStatus = paymentStatus.trim().toLowerCase();
  const isFailedFromGateway = normalizedPaymentStatus === "failed";

  const [status, setStatus] = useState(() =>
    isFailedFromGateway
      ? {
          state: "FAILED",
          responseMessage: "Payment was marked as failed by the gateway.",
          updatedAt: new Date().toISOString(),
        }
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    open: false,
    kind: "success",
    message: "",
  });
  const [failedRetryCount, setFailedRetryCount] = useState(0);
  const [isRetryingAfterFailure, setIsRetryingAfterFailure] = useState(false);
  const [midResponse, setMidResponse] = useState(null);
  const [passwordSetup, setPasswordSetup] = useState(null);
  const [copiedMid, setCopiedMid] = useState(false);

  const completionTriggeredRef = useRef(false);
  const failedRetryTimerRef = useRef(null);
  const statusCheckCountRef = useRef(0);

  const MAX_FAILED_RETRIES = 2;
  const MAX_STATUS_CHECKS = 3;

  const fetchLatestStatus = useCallback(async () => {
    if (!merchantTxnNo || statusCheckCountRef.current >= MAX_STATUS_CHECKS) {
      return null;
    }

    statusCheckCountRef.current += 1;

    const response = await fetch(`/api/txn/status/${merchantTxnNo}`);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Unable to fetch payment status");
    }

    return result.data;
  }, [merchantTxnNo]);

  useEffect(() => {
    if (!merchantTxnNo || isFailedFromGateway) return;

    const loadStatus = async () => {
      setLoading(true);

      try {
        const latestStatus = await fetchLatestStatus();
        if (latestStatus) setStatus(latestStatus);
        setError("");
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Unable to fetch payment status"
        );
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [fetchLatestStatus, isFailedFromGateway, merchantTxnNo]);


  useEffect(() => {
    return () => {
      if (failedRetryTimerRef.current) clearTimeout(failedRetryTimerRef.current);
    };
  }, []);
  useEffect(() => {
    if (callbackHashStatus === "matched") {
      setPopup({
        open: true,
        kind: "success",
        message: "Payment confirmation was validated successfully.",
      });
      return;
    }

    if (callbackError) {
      const callbackErrorMessages = {
        callback_hash_mismatch:
          "We could not verify the payment confirmation from the bank. Please contact support if amount was debited.",
        callback_unknown_transaction:
          "We could not find this transaction. Please try again or contact support.",
        callback_invalid_state_transition:
          "Payment update could not be completed right now. Please refresh after a few minutes.",
        callback_processing_failed:
          "We were unable to process the payment update. Please try again shortly.",
        callback_config_error:
          "The payment service is temporarily unavailable. Please try again later.",
        patient_register_api_failed:
          "Your payment was received, but we could not finish registration. Our team has been notified.",
      };

      setPopup({
        open: true,
        kind: "error",
        message:
          callbackErrorMessages[callbackError] ||
          "We could not process the payment callback.",
      });
    }
  }, [callbackError, callbackHashStatus]);

  useEffect(() => {
    if (!status || completionTriggeredRef.current) return;

    if (status.state === "SUCCESS") {
      completionTriggeredRef.current = true;
      setIsRetryingAfterFailure(false);

      const finalize = async () => {
        try {
          const response = await fetch("/api/user/completeRegistration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ merchantTxnNo }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(
              result.message || "Unable to complete registration after payment."
            );
          }

          setMidResponse(result.data || null);
          setPasswordSetup(result.passwordSetup || null);

          setPopup({
            open: true,
            kind: "success",
            message: "User onboarding completed successfully. Your profile details are ready.",
          });
        } catch (e) {
          setPopup({
            open: true,
            kind: "error",
            message:
              e instanceof Error
                ? e.message
                : "Payment succeeded, but registration could not be completed right now.",
          });
        }
      };

      finalize();
      return;
    }

    if (["FAILED", "CANCELLED"].includes(status.state)) {
      if (isFailedFromGateway) {
        completionTriggeredRef.current = true;
        setIsRetryingAfterFailure(false);
        setPopup({
          open: true,
          kind: "error",
          message: "Payment failed. Please retry from checkout.",
        });
        return;
      }

      if (failedRetryCount < MAX_FAILED_RETRIES) {
        setIsRetryingAfterFailure(true);

        setPopup({
          open: true,
          kind: "info",
          message: `Payment status is ${status.state.toLowerCase()}. Retrying verification (${failedRetryCount + 1}/${MAX_FAILED_RETRIES})...`,
        });

        if (failedRetryTimerRef.current) clearTimeout(failedRetryTimerRef.current);
        failedRetryTimerRef.current = setTimeout(async () => {
          setFailedRetryCount((count) => count + 1);

          try {
            const latestStatus = await fetchLatestStatus();
            if (!latestStatus) return;
            setStatus(latestStatus);
          } catch (_error) {
            // non-blocking retry error
          }
        }, 3000);

        return;
      }

      completionTriggeredRef.current = true;
      setIsRetryingAfterFailure(false);

      setPopup({
        open: true,
        kind: "error",
        message: "Payment was not successful after 2 retries. Please retry from checkout.",
      });

      return;
    }

    if (
      ["PENDING", "RECONCILING", "INITIATED", "REDIRECTED"].includes(
        status.state
      )
    ) {
      setIsRetryingAfterFailure(false);
      setPopup({
        open: true,
        kind: "info",
        message:
          "Payment is still being processed by the gateway. We will keep checking automatically.",
      });
    }
  }, [failedRetryCount, fetchLatestStatus, isFailedFromGateway, merchantTxnNo, status]);

  useEffect(() => {
    if (
      !merchantTxnNo ||
      !status ||
      !["PENDING", "RECONCILING", "INITIATED", "REDIRECTED"].includes(
        status.state
      )
    ) {
      return;
    }

    if (statusCheckCountRef.current >= MAX_STATUS_CHECKS) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const latestStatus = await fetchLatestStatus();
        if (!latestStatus) return;
        setStatus(latestStatus);
      } catch (_error) {
        // non-blocking polling error
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [fetchLatestStatus, merchantTxnNo, status]);

  const statusLabel = useMemo(() => {
    if (!status?.state) return "Awaiting update";
    if (isRetryingAfterFailure) return "Retrying payment verification";

    const labels = {
      SUCCESS: "Payment successful",
      FAILED: "Payment failed",
      CANCELLED: "Payment cancelled",
      PENDING: "Payment in progress",
      RECONCILING: "Payment in progress",
      INITIATED: "Payment initiated",
      REDIRECTED: "Payment in progress",
    };

    return labels[status.state] || status.state;
  }, [isRetryingAfterFailure, status]);

  const statusTone = useMemo(() => {
    if (!status?.state) return "text-gray-700 bg-gray-50 border-gray-200";
    if (isRetryingAfterFailure)
      return "text-amber-700 bg-amber-50 border-amber-200";
    if (status.state === "SUCCESS")
      return "text-green-700 bg-green-50 border-green-200";
    if (["FAILED", "CANCELLED"].includes(status.state))
      return "text-red-700 bg-red-50 border-red-200";
    return "text-amber-700 bg-amber-50 border-amber-200";
  }, [isRetryingAfterFailure, status]);

  const successDetails = useMemo(() => {
    if (!midResponse || typeof midResponse !== "object") return null;

    const user =
      midResponse.patient ||
      midResponse.user ||
      midResponse.profile ||
      {};

    const fullName =
      user.full_name ||
      user.fullName ||
      `${user.first_name || user.firstName || ""} ${user.last_name || user.lastName || ""}`.trim() ||
      "Patient";

    const mid =
      midResponse.mid ||
      midResponse.medibank_id ||
      midResponse.member_id ||
      midResponse.id ||
      "Not available";

    return {
      fullName,
      email: user.email || "Not available",
      mobile: user.phone || user.mobile || "Not available",
      uuid: user.uuid || user.id || "Not available",
      mid,
    };
  }, [midResponse]);

  const handleCopyMedibankId = useCallback(async () => {
    if (!successDetails?.mid || successDetails.mid === "Not available") return;

    try {
      await navigator.clipboard.writeText(successDetails.mid);
    } catch (_error) {
      const textarea = document.createElement("textarea");
      textarea.value = successDetails.mid;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopiedMid(true);

    window.setTimeout(() => {
      setCopiedMid(false);
    }, 2000);
  }, [successDetails?.mid]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-emerald-50 px-4 pb-10 pt-6 md:pt-32">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-2xl shadow-purple-100 backdrop-blur">
          <div className="relative bg-gradient-to-r from-[#6a1b9a] via-[#7b1fa2] to-[#00a884] px-6 py-8 text-white sm:px-8">
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-10 h-20 w-20 rounded-full bg-emerald-300/20 blur-xl" />

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/80">
              Payment Status
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              {status?.state === "SUCCESS"
                ? "Payment Successful"
                : ["FAILED", "CANCELLED"].includes(status?.state)
                ? "Payment Not Completed"
                : "Verifying Payment"}
            </h1>

            <p className="mt-3 max-w-2xl text-sm text-white/85">
              Transaction ID:{" "}
              <span className="font-semibold text-white">
                {status?.rawCallbackPayload?.txnID ||
                  status?.rawCallbackPayload?.bankTxnNo ||
                  "Not available"}
              </span>
            </p>
            <p className="mt-3 max-w-2xl text-sm text-white/85">
              Last Updated{" "}
              <span className="font-semibold text-white">
                {status?.updatedAt ? new Date(status.updatedAt).toLocaleString() : "Not available"}
              </span>
            </p>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div
              className={`rounded-2xl border px-5 py-4 shadow-sm ${statusTone}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-xl shadow-sm">
                  {status?.state === "SUCCESS"
                    ? "✓"
                    : ["FAILED", "CANCELLED"].includes(status?.state)
                    ? "!"
                    : "⏳"}
                </div>

                <div>
                  <p className="text-base font-bold">{statusLabel}</p>
                  <p className="mt-1 text-sm opacity-90">
                    {status?.state === "SUCCESS"
                      ? "Your payment was received successfully."
                      : ["FAILED", "CANCELLED"].includes(status?.state)
                      ? isRetryingAfterFailure
                        ? "We detected a failed response and are retrying verification automatically."
                        : "No amount will be charged for this attempt. Please try again if needed."
                      : "We are waiting for confirmation from the payment gateway. This page updates automatically."}
                  </p>
                </div>
              </div>
            </div>

            {(paymentStatus || callbackState) && !status ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                Latest update from gateway:{" "}
                <span className="font-semibold">
                  {paymentStatus || callbackState}
                </span>
              </div>
            ) : null}

            {loading && !isFailedFromGateway ? (
              <div className="flex items-center gap-3 rounded-2xl border bg-white px-5 py-4 text-sm text-gray-700 shadow-sm">
                <span className="h-3 w-3 animate-pulse rounded-full bg-purple-600" />
                Payment is processing...
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                {error}
              </div>
            ) : null}


            {status?.state === "SUCCESS" && successDetails ? (
              <section className="mid-success-card relative overflow-hidden rounded-[2rem] border border-[#ddd6fe] bg-white p-6 shadow-[0_24px_70px_rgba(14,24,150,0.16)]">
                <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#9F028D]/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-[#0E1896]/20 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="inline-flex rounded-full border border-[#e9d5ff] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#7b1fa2] shadow-sm backdrop-blur">
                      Onboarding Successful
                    </p>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                      Welcome to{" "}
                      <span className="brand-gradient-text drop-shadow-[0_10px_30px_rgba(123,31,162,0.22)]">
                        MediBank
                      </span>
                    </h2>
                    <p className="mt-2 text-sm font-medium text-[#3b3b73]">
                      Your account has been created successfully.
                    </p>
                  </div>

                  <div className="success-orbit relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9F028D_0%,#7b1fa2_48%,#0E1896_100%)] text-4xl text-white shadow-[0_18px_42px_rgba(14,24,150,0.25)]">
                    <span className="absolute inset-0 rounded-full border border-white/40" />
                    <span className="relative">✓</span>
                  </div>
                </div>

                <div className="relative mt-6 rounded-[1.5rem] border border-[#e9d5ff] bg-white/85 p-5 shadow-inner shadow-purple-100/70 backdrop-blur">
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#9F028D]/40 to-transparent" />
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#5b5a8f]">
                        Your MediBank ID
                      </p>
                      <p className="brand-gradient-text mid-id-shine mt-2 break-all text-3xl font-black tracking-tight sm:text-4xl">
                        {successDetails.mid}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d8ccff] bg-white/90 px-4 py-2 text-sm font-semibold text-[#282672] shadow-[0_12px_28px_rgba(40,38,114,0.12)] transition hover:-translate-y-0.5 hover:border-[#7b1fa2] hover:text-[#7b1fa2] hover:shadow-[0_16px_32px_rgba(123,31,162,0.18)] focus:outline-none focus:ring-2 focus:ring-[#7b1fa2] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={handleCopyMedibankId}
                      disabled={successDetails.mid === "Not available"}
                      aria-label="Copy MediBank ID to clipboard"
                    >
                      {copiedMid ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>{copiedMid ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    This is your unique ID on our platform. Please create your
                    password to log in and start using your account.
                  </p>
                </div>
              </section>
            ) : null}

            {status?.state === "SUCCESS" && passwordSetup?.setupUuid ? (
              <section className="rounded-3xl border bg-white p-6 shadow-lg shadow-purple-100">
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-700">
                    Secure Account
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Create Your Password
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Set a strong password to access your MediBank account securely.
                  </p>
                </div>

                <CreatePasswordForm setupUuid={passwordSetup.setupUuid} />
              </section>
            ) : null}
          </div>
        </div>
      </div>


      <style jsx>{`
        .mid-success-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          background: linear-gradient(120deg, #9f028d, #7b1fa2, #0e1896, #9f028d);
          background-size: 220% 220%;
          opacity: 0.16;
          animation: gradientBorderFlow 7s ease infinite;
        }

        .brand-gradient-text {
          background: linear-gradient(90deg, #9f028d 0%, #7b1fa2 45%, #0e1896 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: brandGradientFlow 4.8s ease-in-out infinite alternate;
        }

        .mid-id-shine {
          position: relative;
          filter: drop-shadow(0 12px 24px rgba(14, 24, 150, 0.18));
        }

        .success-orbit::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 9999px;
          border: 1px solid rgba(159, 2, 141, 0.24);
          animation: orbitPulse 2.4s ease-in-out infinite;
        }

        @keyframes gradientBorderFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes brandGradientFlow {
          from { background-position: 0% center; }
          to { background-position: 100% center; }
        }

        @keyframes orbitPulse {
          0%, 100% { transform: scale(0.92); opacity: 0.55; }
          50% { transform: scale(1.1); opacity: 0.95; }
        }
      `}</style>

      {popup.open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div
              className={`px-6 py-5 ${
                popup.kind === "success"
                  ? "bg-emerald-600"
                  : popup.kind === "info"
                  ? "bg-amber-500"
                  : "bg-red-600"
              } text-white`}
            >
              <h2 className="text-xl font-bold">
                {popup.kind === "success"
                  ? "Payment Success"
                  : popup.kind === "info"
                  ? "Payment In Progress"
                  : "Payment Error"}
              </h2>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-gray-700">{popup.message}</p>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-[#7b1fa2] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-[#6a1b9a]"
                onClick={() =>
                  setPopup((current) => ({ ...current, open: false }))
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-screen max-w-xl px-4 pb-8 pt-6 md:pt-32">Loading payment status...</main>
      }
    >
      <StatusInner />
    </Suspense>
  );
}
