"use client";

import { useMemo, useState } from "react";

const USER_PORTAL_LOGIN_URL =
  "https://patient-web-c4qbq7eraq-el.a.run.app/login";

const PASSWORD_REQUIREMENTS = [
  {
    id: "length",
    label: "at least 8 characters",
    test: (value) => value.length >= 8,
  },
  {
    id: "number",
    label: "at least one numeric digit (0-9)",
    test: (value) => /\d/.test(value),
  },
  {
    id: "lowercase",
    label: "at least one lower case letter",
    test: (value) => /[a-z]/.test(value),
  },
  {
    id: "uppercase",
    label: "at least one upper case letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    id: "special",
    label: "at least one special character",
    test: (value) => /[!-/:-@[-`{-~]/.test(value),
  },
];

function PasswordVisibilityToggle({ isVisible, onToggle, viewLabel, hideLabel }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-1 right-1 inline-flex items-center gap-1 rounded-md px-2 text-xs font-semibold text-purple-700 transition hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-200"
      aria-label={isVisible ? hideLabel : viewLabel}
      aria-pressed={isVisible}
    >
      <span aria-hidden="true">
        {isVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" y1="2" x2="22" y2="22" />
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </span>
      {isVisible ? "Hide" : "View"}
    </button>
  );
}

export default function CreatePasswordForm({
  setupUuid,
  title = "Create password",
  subtitle = "Set a secure password for your account.",
  onSuccess,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState({ kind: "", message: "" });
  const [passwordCreated, setPasswordCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirementStatus = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.map((requirement) => ({
        ...requirement,
        fulfilled: requirement.test(password),
      })),
    [password]
  );

  const passwordMeetsRequirements = passwordRequirementStatus.every(
    (requirement) => requirement.fulfilled
  );

  const canSubmit = useMemo(() => {
    return (
      passwordMeetsRequirements &&
      confirmPassword.length > 0 &&
      password === confirmPassword &&
      !submitting
    );
  }, [confirmPassword, password, passwordMeetsRequirements, submitting]);

  async function handleSubmit(event) {
    event.preventDefault();
    setResult({ kind: "", message: "" });

    if (!passwordMeetsRequirements) {
      setResult({
        kind: "error",
        message: "Password must fulfill all listed requirements.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setResult({ kind: "error", message: "Passwords do not match." });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`/api/auth/password/setup/${setupUuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Unable to create password.");
      }

      setPassword("");
      setConfirmPassword("");
      setPasswordCreated(true);
      setResult({ kind: "", message: "" });

      onSuccess?.();
    } catch (error) {
      setResult({
        kind: "error",
        message: error?.message || "Unable to create password right now.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (passwordCreated) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Account setup complete
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Password saved
        </h2>

        <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
          Password saved successfully, please log in to use your account
        </p>

        <a
          href={USER_PORTAL_LOGIN_URL}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#7b1fa2] px-4 py-2 font-semibold text-white transition hover:bg-[#6a1b9a] focus:outline-none focus:ring-4 focus:ring-purple-200"
        >
          Login
        </a>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-purple-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-700">
        Account setup
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>

      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_15rem] md:items-start">
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="new-password"
              >
                New password
              </label>
              <div className="relative mt-1">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                  aria-describedby="new-password-requirements"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-24"
                  placeholder="Enter a secure password"
                />
                <PasswordVisibilityToggle
                  isVisible={showPassword}
                  onToggle={() => setShowPassword((isVisible) => !isVisible)}
                  viewLabel="View new password"
                  hideLabel="Hide new password"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="confirm-password"
              >
                Confirm password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  minLength={8}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-24"
                  placeholder="Re-enter your password"
                />
                <PasswordVisibilityToggle
                  isVisible={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword((isVisible) => !isVisible)
                  }
                  viewLabel="View confirmed password"
                  hideLabel="Hide confirmed password"
                />
              </div>
            </div>
          </div>

          <div
            id="new-password-requirements"
            className="rounded-xl border border-purple-100 bg-purple-50/50 p-4"
            aria-live="polite"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-gray-900">
              New password requirements
            </p>
            <ul className="mt-3 space-y-2 text-xs font-semibold">
              {passwordRequirementStatus.map((requirement) => (
                <li
                  key={requirement.id}
                  className={
                    requirement.fulfilled ? "text-green-600" : "text-gray-500"
                  }
                >
                  <span aria-hidden="true" className="mr-1">
                    {requirement.fulfilled ? "✓" : "○"}
                  </span>
                  <span>{requirement.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-lg bg-[#7b1fa2] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Creating password..." : "Create password"}
        </button>
      </form>

      {result.message ? (
        <p
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${
            result.kind === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {result.message}
        </p>
      ) : null}
    </section>
  );
}
