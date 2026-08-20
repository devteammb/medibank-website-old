"use client";

import { useEffect } from "react";

export default function PaymentError({ error, reset }) {
  useEffect(() => {
    console.error("Payment route error boundary:", error);
  }, [error]);

  return (
    <main className="mx-auto min-h-screen max-w-xl px-4 pb-8 pt-6 md:pt-32">
      <h1 className="text-2xl font-semibold text-red-700">Payment flow encountered an error</h1>
      <p className="mt-3 text-sm text-gray-700">
        We could not complete this action due to a temporary issue. Please retry the payment flow. If money was debited, wait for gateway
        advice and verify from the payment status page.
      </p>
      <button type="button" className="mt-6 rounded bg-[#7b1fa2] px-4 py-2 text-white" onClick={() => reset()}>
        Retry
      </button>
    </main>
  );
}
