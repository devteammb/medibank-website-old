import Link from "next/link";

const policyLinks = [
  { key: "privacy", label: "Privacy Policy", shortLabel: "Privacy" },
  { key: "terms", label: "Terms & Conditions", shortLabel: "Terms" },
  { key: "refund", label: "Refund & Cancellation", shortLabel: "Refunds" },
];

export default function LegalPolicyPage({ title, updated, subtitle, sections, activePolicy }) {
  return (
    <main className="mt-[100px] bg-[#F8FAFF] py-10 md:py-16">
      <article className="container mx-auto max-w-5xl px-4">
        {activePolicy && (
          <nav
            aria-label="Policy pages"
            className="mb-10 rounded-[28px] bg-[#EEF1F8] p-3 shadow-[12px_12px_28px_rgba(163,174,203,0.48),-12px_-12px_28px_rgba(255,255,255,0.95)] md:p-4"
          >
            <p className="mb-3 px-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#73779A]">
              Choose a policy
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {policyLinks.map((policy) => {
                const isActive = activePolicy === policy.key;

                return (
                  <Link
                    key={policy.key}
                    href={`/policy?view=${policy.key}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-14 items-center justify-center rounded-2xl px-2 text-center text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4AFF] focus-visible:ring-offset-2 md:min-h-16 md:px-5 md:text-base ${
                      isActive
                        ? "bg-[#EEF1F8] text-[#3024AE] shadow-[inset_5px_5px_10px_rgba(163,174,203,0.48),inset_-5px_-5px_10px_rgba(255,255,255,0.95)]"
                        : "bg-[#EEF1F8] text-[#3E426D] shadow-[5px_5px_12px_rgba(163,174,203,0.5),-5px_-5px_12px_rgba(255,255,255,0.95)] hover:-translate-y-0.5 hover:text-[#5C4AFF]"
                    }`}
                  >
                    <span className="hidden sm:inline">{policy.label}</span>
                    <span className="sm:hidden">{policy.shortLabel}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
        <div className="rounded-[32px] bg-white px-6 py-10 shadow-[0_12px_50px_rgba(13,11,76,0.08)] md:px-10 md:py-14">
          <header className="border-b border-[#E6EAF7] pb-8">
            <span className="inline-flex rounded-full bg-[#EEF1FF] px-4 py-1 text-sm font-medium text-[#3024AE]">
              Legal
            </span>
            <h1 className="mt-4 text-3xl font-bold uppercase text-[#0D0B4C] md:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-base leading-7 text-[#4B4F7B] md:text-lg">{subtitle}</p>
            )}
            <p className="mt-5 text-sm font-semibold text-[#1D225B]">Last Updated: {updated}</p>
          </header>

          <div className="mt-8 space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="rounded-3xl border border-[#E9ECF8] bg-[#FCFDFF] p-6 md:p-8">
                <h2 className="text-xl font-semibold uppercase text-[#0D0B4C] md:text-2xl">{section.title}</h2>
                {section.content?.map((item, index) => {
                  if (item.type === "list") {
                    return (
                      <ul key={index} className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-[#1D225B] marker:text-[#5C4AFF]">
                        {item.items.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    );
                  }
                  if (item.type === "label") {
                    return <h3 key={index} className="mt-5 text-lg font-semibold text-[#1D225B]">{item.text}</h3>;
                  }
                  return <p key={index} className="mt-4 whitespace-pre-line text-base leading-7 text-[#4B4F7B]">{item.text}</p>;
                })}
              </section>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
