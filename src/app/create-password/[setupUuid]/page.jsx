"use client";

import CreatePasswordForm from "@/components/auth/CreatePasswordForm";

export default function CreatePasswordPage({ params }) {
  const setupUuid = params?.setupUuid || "";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f3e8ff,_transparent_34%),linear-gradient(135deg,_#fff_0%,_#faf5ff_45%,_#ecfdf5_100%)] px-6 py-10 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl items-center justify-center">
        <CreatePasswordForm
          setupUuid={setupUuid}
          title="Create password"
          subtitle="Set a secure password for your account to complete onboarding."
        />
      </div>
    </main>
  );
}
