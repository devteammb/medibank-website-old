import Link from "next/link";
import { FiArrowLeft, FiBell, FiCheckCircle, FiShield, FiZap } from "react-icons/fi";

export const metadata = {
  title: "Claim Your Health Identity | Coming Soon",
  description:
    "Medibank's secure health identity claim experience is coming soon.",
};

const launchHighlights = [
  {
    icon: FiShield,
    title: "Secure by design",
    description: "Built to keep your health records protected, portable, and always in your control.",
  },
  {
    icon: FiZap,
    title: "Fast onboarding",
    description: "A simpler way to create your lifetime health identity without paperwork or hassle.",
  },
  {
    icon: FiCheckCircle,
    title: "Care-ready access",
    description: "Designed so your verified medical information is ready when it matters most.",
  },
];

export default function ClaimComingSoonPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#f8f4ff] px-4 pb-16 pt-28 text-[#282672] sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(216,27,96,0.24),transparent_32%),radial-gradient(circle_at_85%_12%,rgba(59,10,163,0.24),transparent_30%),linear-gradient(135deg,#ffffff_0%,#f7f0ff_45%,#eef8ff_100%)]" />
      <div className="absolute left-1/2 top-28 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#d81b60]/20 via-[#7b1fa2]/20 to-[#3b0aa3]/20 blur-3xl" />
      <div className="absolute -right-24 top-40 -z-10 h-72 w-72 rounded-full border border-white/70 bg-white/30 shadow-2xl backdrop-blur" />
      <div className="absolute -bottom-20 -left-16 -z-10 h-80 w-80 rounded-full border border-white/70 bg-white/40 shadow-2xl backdrop-blur" />

      <section className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-semibold text-[#7b1fa2] shadow-[0_12px_34px_rgba(123,31,162,0.14)] backdrop-blur">
          <FiBell aria-hidden="true" />
          Your health identity claim experience is launching soon
        </div>

        <div className="relative w-full overflow-hidden rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_30px_90px_rgba(40,38,114,0.18)] backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute right-10 top-10 hidden h-20 w-20 rounded-3xl bg-gradient-to-br from-[#d81b60] to-[#3b0aa3] opacity-15 blur-xl md:block" />
          <div className="absolute bottom-10 left-10 hidden h-20 w-20 rounded-3xl bg-gradient-to-br from-[#3b0aa3] to-[#00a3ff] opacity-15 blur-xl md:block" />

          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.35em] text-[#9f028d]">
              Coming Soon
            </p>
            <h1 className="font-aptos-black text-4xl leading-tight text-[#17155f] sm:text-5xl lg:text-7xl">
              Claim Your Health Identity
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#4b4a86] sm:text-lg">
              We are crafting a beautiful, secure, and effortless way for you to activate your Medibank Health Identity. Stay tuned while we put the finishing touches on your lifetime health profile experience.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {launchHighlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/80 bg-white/70 p-5 text-left shadow-[0_18px_45px_rgba(40,38,114,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(123,31,162,0.18)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] text-white shadow-lg">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h2 className="text-lg font-extrabold text-[#17155f]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5f5c93]">{description}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 rounded-[28px] border border-[#ece3ff] bg-gradient-to-r from-white/90 to-[#f6efff]/90 p-5 shadow-inner sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7b1fa2]">
                Launch update
              </p>
              <p className="mt-1 text-sm leading-6 text-[#4b4a86]">
                Registration is temporarily paused while the new claim flow is prepared.
              </p>
            </div>
            <span className="rounded-full bg-[#282672] px-4 py-2 text-sm font-bold text-white shadow-lg">
              Stay tuned
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#d8ccff] bg-white px-6 py-3 text-sm font-bold text-[#282672] shadow-[0_12px_30px_rgba(40,38,114,0.12)] transition hover:-translate-y-1 hover:border-[#7b1fa2] hover:text-[#7b1fa2]"
            >
              <FiArrowLeft aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(123,31,162,0.35)] transition hover:-translate-y-1 hover:brightness-110"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
