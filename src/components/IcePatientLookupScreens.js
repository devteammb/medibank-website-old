"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiArrowLeft, FiCamera, FiImage, FiMenu } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";

function LookupShell({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full rounded-[28px]  px-5 py-6  sm:px-6 ${className}`}
    >
      {children}
    </div>
  );
}

function DividerWithText() {
  return (
    <div className="my-7 flex items-center gap-3 text-[11px] font-extrabold text-[#071f9f]">
      <span className="h-px flex-1 bg-[#8a98dc]" />
      OR
      <span className="h-px flex-1 bg-[#8a98dc]" />
    </div>
  );
}

function LookupHome({ onScan }) {
  return (
    <LookupShell>
            <h1 className="mt-7 text-center text-[18px] font-extrabold text-[#4d008e]">
        Scan a QR code to access medical records
      </h1>

      <section className="mt-5 rounded-[18px] border border-[#ded9ef] bg-white px-7 py-8 text-center shadow-[0_14px_34px_rgba(14,24,150,0.08)]">
        <div className="mx-auto flex h-[128px] w-[128px] items-center justify-center rounded-[18px] bg-white">
          <Image
            src="/images/QR.png"
            alt="QR code frame"
            width={104}
            height={104}
            className="h-[104px] w-[104px] object-contain"
          />
        </div>
        <button
          type="button"
          onClick={onScan}
          className="mt-6 inline-flex h-[40px] w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-[#b4009f] to-[#1416a3] text-[12px] font-extrabold text-white shadow-[0_13px_22px_rgba(14,24,150,0.24)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#d6dbff]"
        >
          <FiCamera className="h-4 w-4" aria-hidden="true" />
          Scan QR Code
        </button>
      </section>

      <DividerWithText />

      <form onSubmit={(event) => event.preventDefault()}>
        <label
          htmlFor="patient-mid"
          className="mb-2 block text-[12px] font-extrabold text-[#071f9f]"
        >
          Enter MID
        </label>
        <input
          id="patient-mid"
          name="mid"
          type="text"
          inputMode="text"
          placeholder="1234568974650"
          className="h-[42px] w-full rounded-[6px] border border-[#dfe3f8] bg-white px-4 text-[12px] font-medium text-[#071f9f] outline-none transition placeholder:text-[#d8ddf2] focus:border-[#3d4ed8] focus:ring-4 focus:ring-[#d6dbff]/70"
        />
        <button
          type="submit"
          className="mt-5 h-[43px] w-full rounded-[16px] bg-gradient-to-b from-[#b4009f] to-[#1416a3] text-[13px] font-extrabold text-white shadow-[0_13px_22px_rgba(14,24,150,0.24)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#d6dbff]"
        >
          Search
        </button>
      </form>
    </LookupShell>
  );
}

function CornerFrame() {
  const cornerClass =
    "absolute h-16 w-16 border-[#a2028f] before:absolute before:bg-[#071f9f]";

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[25px]">
      <span
        className={`${cornerClass} left-0 top-0 rounded-tl-[25px] border-l-2 border-t-2 before:-bottom-[1px] before:left-[-2px] before:h-12 before:w-[2px]`}
        aria-hidden="true"
      />
      <span
        className={`${cornerClass} right-0 top-0 rounded-tr-[25px] border-r-2 border-t-2 before:-bottom-[1px] before:right-[-2px] before:h-12 before:w-[2px]`}
        aria-hidden="true"
      />
      <span
        className={`${cornerClass} bottom-0 left-0 rounded-bl-[25px] border-b-2 border-l-2 before:-top-[1px] before:left-[-2px] before:h-12 before:w-[2px]`}
        aria-hidden="true"
      />
      <span
        className={`${cornerClass} bottom-0 right-0 rounded-br-[25px] border-b-2 border-r-2 before:-top-[1px] before:right-[-2px] before:h-12 before:w-[2px]`}
        aria-hidden="true"
      />
    </div>
  );
}

function Scanner({ onBack }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const frameRef = useRef(null);
  const [cameraStatus, setCameraStatus] = useState("Starting camera…");
  const [scanResult, setScanResult] = useState("");
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [canUseTorch, setCanUseTorch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const stopCamera = () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };

    const scanFrame = async () => {
      if (!isMounted || !detectorRef.current || !videoRef.current) {
        return;
      }

      if (videoRef.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        try {
          const codes = await detectorRef.current.detect(videoRef.current);
          if (codes.length > 0) {
            const value = codes[0].rawValue || "";
            setScanResult(value || "QR code detected");

            if (/^https?:\/\//i.test(value)) {
              setCameraStatus("QR code detected. Redirecting…");
              stopCamera();
              window.location.assign(value);
            } else {
              setCameraStatus("QR code detected.");
            }
            return;
          }
        } catch (error) {
          setCameraStatus("Camera is open. Align the QR code inside the frame.");
        }
      }

      frameRef.current = requestAnimationFrame(scanFrame);
    };

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraStatus("Camera access is not supported in this browser.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
          },
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const [videoTrack] = stream.getVideoTracks();
        const capabilities = videoTrack?.getCapabilities?.() || {};
        setCanUseTorch(Boolean(capabilities.torch));
        setCameraStatus("Camera is open. Align the QR code inside the frame.");

        if ("BarcodeDetector" in window) {
          detectorRef.current = new window.BarcodeDetector({ formats: ["qr_code"] });
          frameRef.current = requestAnimationFrame(scanFrame);
        } else {
          setCameraStatus(
            "Camera is open. QR detection depends on browser support; align the code or upload from gallery.",
          );
        }
      } catch (error) {
        setCameraStatus(
          "Unable to open camera. Please allow camera permission and try again.",
        );
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, []);

  const toggleTorch = async () => {
    const [videoTrack] = streamRef.current?.getVideoTracks() || [];

    if (!videoTrack || !canUseTorch) {
      return;
    }

    const nextTorchState = !torchEnabled;
    await videoTrack.applyConstraints({ advanced: [{ torch: nextTorchState }] });
    setTorchEnabled(nextTorchState);
  };

  return (
    <LookupShell className="bg-[#f4f5fb]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to QR and MID search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#7d0bb0] transition hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-white/70"
        >
          <FiArrowLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={toggleTorch}
          aria-label="Toggle scanner light"
          disabled={!canUseTorch}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#a2028f] shadow-[0_8px_20px_rgba(14,24,150,0.12)] transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LuSparkles className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-[25px] bg-[#101322] shadow-[inset_0_0_0_1px_rgba(14,24,150,0.06)]">
        <div className="relative h-[300px]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            aria-label="Live camera preview for QR scanning"
          />
          <CornerFrame />
        </div>
      </div>

      <p className="mt-4 rounded-[14px] bg-white px-4 py-3 text-center text-[12px] font-bold leading-snug text-[#071f9f] shadow-[0_8px_20px_rgba(14,24,150,0.08)]">
        {scanResult ? `Scanned QR: ${scanResult}` : cameraStatus}
      </p>

      <div className="mt-5 text-center">
        <label className="inline-flex h-[36px] cursor-pointer items-center gap-2 rounded-[9px] bg-white px-4 text-[12px] font-extrabold text-[#9c14aa] shadow-[0_8px_20px_rgba(14,24,150,0.10)] transition hover:-translate-y-0.5 focus-within:ring-4 focus-within:ring-white/70">
          <FiImage className="h-4 w-4" aria-hidden="true" />
          Upload from Gallery
          <input type="file" accept="image/*" className="sr-only" />
        </label>
      </div>
    </LookupShell>
  );
}

export default function IcePatientLookupScreens() {
  const [screen, setScreen] = useState("lookup");

  if (screen === "scanner") {
    return <Scanner onBack={() => setScreen("lookup")} />;
  }

  return <LookupHome onScan={() => setScreen("scanner")} />;
}
