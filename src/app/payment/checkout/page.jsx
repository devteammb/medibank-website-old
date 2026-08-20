"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, CheckCircle2, ShieldCheck } from "lucide-react";

const PLAN_GROUPS = {
  individual: {
    label: "Individual plans",
    description: "Personal membership plans for one registered user.",
    plans: [
      {
        id: "half",
        name: "Half Yearly",
        eyebrow: "6 months",
        amountPaise: 55900,
        description: "A flexible plan to get started with secure health record access.",
        badge: "Starter value",
        features: ["Secure digital health identity", "Emergency ICE access", "Family-ready medical profile"],
        accent: "from-[#7b1fa2] via-[#8d2fc0] to-[#b246b9]",
      },
      {
        id: "annual",
        name: "Annual",
        eyebrow: "12 months",
        amountPaise: 99900,
        description: "Best for uninterrupted care continuity with the strongest yearly value.",
        badge: "Best value",
        features: ["Everything in Half Yearly", "Lowest effective monthly cost", "Priority continuity for one full year"],
        accent: "from-[#3D0F93] via-[#7b1fa2] to-[#94008E]",
        recommended: true,
      },
    ],
  },
  healthCircle: {
    label: "Health Circle plans",
    description: "Yearly care continuity plans for your trusted health circle.",
    plans: [
      {
        id: "health-circle-4",
        name: "Health Circle 4",
        eyebrow: "yearly",
        amountPaise: 349900,
        description: "Protect and coordinate care for a close circle of up to 4 members.",
        badge: "Circle care",
        features: ["Up to 4 health circle members", "Shared emergency readiness", "Year-round health record continuity"],
        accent: "from-[#0f6f93] via-[#1f8da2] to-[#46b9a8]",
      },
      {
        id: "health-circle-6",
        name: "Health Circle 6",
        eyebrow: "yearly",
        amountPaise: 499900,
        description: "Expanded coverage for larger families and care support networks.",
        badge: "Best circle value",
        features: ["Up to 6 health circle members", "Family-ready medical profiles", "Priority continuity for one full year"],
        accent: "from-[#3D0F93] via-[#0f6f93] to-[#94008E]",
      },
    ],
  },
};

const formatRupees = (amountPaise) => `₹${(amountPaise / 100).toLocaleString("en-IN")}`;

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();

  const [activePlanGroup, setActivePlanGroup] = useState("individual");
  const visiblePlans = PLAN_GROUPS[activePlanGroup].plans;
  const recommendedPlan = visiblePlans.find((plan) => plan.recommended) || visiblePlans[0];
  const [selectedPlanId, setSelectedPlanId] = useState(recommendedPlan.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registrationId = params.get("registrationId") || "";
  const fullName = params.get("fullName") || "";
  const email = params.get("email") || "";
  const mobile = params.get("mobile") || "";
  const selectedPlan = useMemo(() => visiblePlans.find((plan) => plan.id === selectedPlanId) || recommendedPlan, [selectedPlanId, recommendedPlan, visiblePlans]);

  const handlePlanGroupChange = (groupKey) => {
    const nextPlans = PLAN_GROUPS[groupKey].plans;
    const nextRecommendedPlan = nextPlans.find((plan) => plan.recommended) || nextPlans[0];
    setActivePlanGroup(groupKey);
    setSelectedPlanId(nextRecommendedPlan.id);
  };

  const handlePayNow = async () => {
    setError("");
    if (!registrationId || !fullName || !email || !mobile) {
      setError("Missing registration details. Please restart registration.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/payments/icici/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          planId: selectedPlan.id,
          amountPaise: selectedPlan.amountPaise,
          customerName: fullName,
          customerEmail: email,
          customerMobile: mobile,
        }),
      });

      const result = await response.json();
      const redirectUrl =
        result?.data?.redirectUrl ||
        (result?.error?.gateway?.redirectURI && result?.error?.gateway?.tranCtx
          ? `${result.error.gateway.redirectURI}?tranCtx=${encodeURIComponent(result.error.gateway.tranCtx)}`
          : "");

      if (!redirectUrl) {
        throw new Error(result.message || "Unable to start payment");
      }

      window.location.assign(redirectUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf8ff] px-4 pb-8 pt-6 text-[#201836] sm:px-6 md:pt-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-[-10%] h-72 w-72 rounded-full bg-[#c9a8f5]/45 blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-80 w-80 rounded-full bg-[#f1b8e6]/50 blur-3xl" />
        <div className="absolute bottom-[-18%] left-1/3 h-96 w-96 rounded-full bg-[#d8d3ff]/55 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl items-center">
        <div className="w-full rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(61,15,147,0.16)] backdrop-blur-xl sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <aside className="rounded-[1.75rem] bg-[linear-gradient(145deg,#3D0F93_0%,#7b1fa2_52%,#94008E_100%)] p-6 text-white shadow-[0_20px_55px_rgba(123,31,162,0.35)] sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Secure checkout
              </div>

              <div className="mt-10">
                <p className="text-sm font-medium text-white/75">Step 2 of 2</p>
                <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">Choose your care continuity plan</h1>
                <p className="mt-5 max-w-md text-base leading-7 text-white/78">
                  Select a Medibank membership duration and continue to the payment gateway. Your registration details stay protected while payment is verified server-side.
                </p>
              </div>

              <div className="medi-guard-showcase relative mt-10 overflow-hidden p-5">
                <div className="absolute -right-8 -top-10 h-32 w-32" aria-hidden="true" />
                <div className="absolute -bottom-12 left-8 h-36 w-36" aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

                <div className="relative mx-auto flex min-h-56 max-w-sm items-center justify-center sm:min-h-64">
                  <div className="medi-guard-ring absolute h-48 w-48 rounded-full border border-dashed border-white/35 sm:h-56 sm:w-56" aria-hidden="true" />
                  <div className="medi-guard-pulse absolute h-36 w-36 rounded-full bg-white/15 blur-xl sm:h-44 sm:w-44" aria-hidden="true" />
                  <span className="medi-guard-spark medi-guard-spark-one" aria-hidden="true" />
                  <span className="medi-guard-spark medi-guard-spark-two" aria-hidden="true" />
                  <span className="medi-guard-spark medi-guard-spark-three" aria-hidden="true" />
                  <Image
                    src="/images/medi-guard.png"
                    alt="Medi Guard protection shield"
                    width={260}
                    height={260}
                    priority
                    className="medi-guard-float relative z-10 h-auto w-48 drop-shadow-[0_28px_42px_rgba(26,9,73,0.38)] sm:w-56"
                  />
                </div>
              </div>
            </aside>

            <div className="flex flex-col rounded-[1.75rem] border border-[#eee8fb] bg-white p-5 shadow-[0_16px_45px_rgba(32,24,54,0.08)] sm:p-7 lg:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7b1fa2]">Membership plans</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-[#1f1635] sm:text-3xl">Pick the plan that fits you</h2>
                </div>
                <div className="rounded-2xl bg-[#f6efff] px-4 py-3 text-sm text-[#5a277c]">
                  Selected: <span className="font-bold">{selectedPlan.name}</span>
                </div>
              </div>

              <div className="mt-7 rounded-[1.5rem] border border-[#eadff8] bg-[#fbf8ff] p-2" role="tablist" aria-label="Choose plan category">
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(PLAN_GROUPS).map(([groupKey, group]) => {
                    const active = activePlanGroup === groupKey;

                    return (
                      <button
                        key={groupKey}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        className={`rounded-[1.15rem] px-4 py-3 text-left transition ${
                          active ? "bg-white text-[#201836] shadow-[0_12px_30px_rgba(123,31,162,0.14)]" : "text-[#6b617c] hover:bg-white/70"
                        }`}
                        onClick={() => handlePlanGroupChange(groupKey)}
                      >
                        <span className="block text-sm font-black">{group.label}</span>
                        <span className="mt-1 block text-xs leading-5">{group.description}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <fieldset className="mt-5" aria-label={`Choose a subscription plan from ${PLAN_GROUPS[activePlanGroup].label}`}>
                <legend className="sr-only">Choose from {PLAN_GROUPS[activePlanGroup].label}</legend>
                <div className="grid gap-5 md:grid-cols-2">
                  {visiblePlans.map((plan) => {
                    const selected = selectedPlanId === plan.id;

                    return (
                      <label
                        key={plan.id}
                        className={`group relative flex min-h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border p-5 transition duration-300 focus-within:ring-4 focus-within:ring-[#7b1fa2]/25 ${
                          selected
                            ? "border-[#7b1fa2] bg-[#fcf8ff] shadow-[0_22px_55px_rgba(123,31,162,0.22)]"
                            : "border-[#e7def7] bg-white shadow-[0_12px_34px_rgba(60,45,93,0.08)] hover:-translate-y-1 hover:border-[#cdb8ea] hover:shadow-[0_18px_45px_rgba(123,31,162,0.16)]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={plan.id}
                          checked={selected}
                          onChange={() => setSelectedPlanId(plan.id)}
                          className="sr-only"
                        />

                        <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${plan.accent}`} />
                        <div className="flex items-start justify-between gap-4 pt-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#7b1fa2]">{plan.eyebrow}</span>
                              {plan.badge && (
                                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${selected ? "bg-[#7b1fa2] text-white" : "bg-[#f4eaff] text-[#6b2490]"}`}>
                                  {plan.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="mt-3 text-2xl font-black text-[#201836]">{plan.name}</h3>
                          </div>
                          <span
                            className={`grid h-9 w-9 flex-none place-items-center rounded-full border transition ${
                              selected ? "border-[#7b1fa2] bg-[#7b1fa2] text-white shadow-lg shadow-[#7b1fa2]/30" : "border-[#d9c9ec] bg-white text-transparent"
                            }`}
                            aria-hidden="true"
                          >
                            <Check className="h-5 w-5" strokeWidth={3} />
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-[#625a75]">{plan.description}</p>
                        <div className="mt-6 flex items-end gap-2">
                          <span className="text-4xl font-black tracking-tight text-[#201836]">{formatRupees(plan.amountPaise)}</span>
                          <span className="pb-1 text-sm font-medium text-[#756d85]">/ {plan.eyebrow}</span>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-[#3c344f]">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex gap-2.5">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#7b1fa2]" aria-hidden="true" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {error ? (
                <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#f0eafa] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d9c9ec] px-5 py-3 text-sm font-bold text-[#5a277c] transition hover:bg-[#f7f0ff]"
                  onClick={() => router.push("/userRegistration")}
                  type="button"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to registration
                </button>

                <button
                  className="rounded-2xl bg-[linear-gradient(135deg,#3D0F93_0%,#7b1fa2_48%,#94008E_100%)] px-7 py-3.5 text-sm font-black text-white shadow-[0_16px_36px_rgba(123,31,162,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(123,31,162,0.42)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  onClick={handlePayNow}
                  disabled={loading}
                  type="button"
                >
                  {loading ? "Starting payment..." : `Pay Now ${formatRupees(selectedPlan.amountPaise)}`}
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PaymentCheckoutPage() {
  return (
    <Suspense fallback={<main className="mx-auto min-h-screen max-w-xl px-4 pb-8 pt-6 md:pt-32">Loading checkout...</main>}>
      <CheckoutInner />
    </Suspense>
  );
}
