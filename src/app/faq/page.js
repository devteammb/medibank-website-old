"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, CircleHelp, Search, ShieldCheck, Sparkles } from "lucide-react";
import styles from "./page.module.css";

const categories = [
  {
    id: "general",
    label: "General",
    eyebrow: "Start here",
    questions: [
      ["What is MediBank?", "MediBank is a secure digital health-record platform that helps you store, organise and access your medical records in one place, so your health history stays with you wherever you go."],
      ["What is a MediBank Health Identity?", "Your MediBank Health Identity is your personal digital health profile. It brings your medical records together over time and helps you access or share them when needed."],
      ["Why do I need MediBank if hospitals already keep my records?", "Your records are often spread across hospitals, labs, clinics, emails and paper files. MediBank helps bring them together under one Health Identity, giving you easier access to your complete health history."],
      ["What types of medical records can I store?", "You can store supported medical documents such as prescriptions, laboratory reports, diagnostic reports, discharge summaries, vaccination records and other relevant health records."],
      ["Can I upload records from different hospitals and laboratories?", "Yes. MediBank is designed to help you organise health records from different healthcare providers in one place."],
      ["Can I access my records from anywhere?", "Yes. You can access your MediBank account through supported devices and platforms wherever the service is available and you have an internet connection."],
      ["Can I share my medical records with a doctor?", "Yes. MediBank allows you to securely share your records with healthcare professionals while keeping you in control of access."],
      ["Does my doctor need to be from the same hospital where the report was created?", "No. Your MediBank records are associated with you, not with a particular hospital. You can share relevant records with another healthcare professional when required."],
      ["Is MediBank a hospital or medical consultation service?", "No. MediBank is a health-information technology platform. It does not replace a doctor, hospital, medical diagnosis or professional medical advice."],
      ["Can MediBank diagnose diseases or prescribe medicines?", "No. MediBank does not replace a qualified healthcare professional. Any medical decisions, diagnosis or treatment should be discussed with your doctor."],
    ],
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    eyebrow: "Your data",
    questions: [
      ["Who owns the health information stored in my MediBank account?", "Your health information remains yours. MediBank provides the technology to securely store, organise and manage your records."],
      ["Can MediBank sell my medical information?", "MediBank does not treat your personal health information as a product to be sold. Your information is handled in accordance with our Privacy Policy, your permissions and applicable law."],
      ["Can a doctor access my records without my permission?", "Doctors do not automatically receive access to your complete MediBank records. Access is controlled through the permissions and consent mechanisms provided by the platform."],
      ["Can I choose what information I share?", "Where supported, MediBank allows you to control the health information you share and with whom you share it."],
      ["Can I revoke access after sharing my records?", "Yes. Where access has been granted through MediBank's sharing controls, you can manage or revoke that access according to the available consent settings."],
      ["How does MediBank protect my medical records?", "MediBank uses security safeguards including encryption, authentication, access controls and secure infrastructure designed for handling sensitive health information."],
      ["Are uploaded medical documents encrypted?", "MediBank's document-processing architecture is designed to protect medical records using strong encryption and controlled access throughout storage and retrieval."],
      ["Can MediBank employees see my medical reports?", "Access to sensitive information is restricted according to operational requirements and authorised roles. MediBank is designed to minimise unnecessary human access to health information."],
      ["Can I see who has accessed my medical information?", "MediBank is designed around controlled and accountable access. Where supported, access activity can be recorded so users have greater visibility into how their information is being accessed."],
      ["What should I do if I suspect unauthorised access?", "Contact MediBank support immediately. We can help investigate the issue and guide you through steps such as securing your account and reviewing access."],
      ["What happens if I lose my phone?", "Your records are linked to your MediBank account rather than permanently stored only on your device. You should secure your account and contact support if you believe your credentials or device may have been compromised."],
      ["Can I permanently delete my MediBank account?", "You can request account deletion subject to MediBank's applicable data-retention requirements, legal obligations and Privacy Policy."],
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Subscription",
    eyebrow: "Plans & billing",
    questions: [
      ["Is MediBank free?", "MediBank may provide different subscription options depending on the services and features included. Current pricing will always be displayed before you purchase a plan."],
      ["What subscription plans does MediBank offer?", "MediBank offers plans designed for individual users as well as households through Health Circle. Available plans, limits and benefits are shown on the pricing page."],
      ["Are there any hidden charges?", "No hidden subscription charges are added without being disclosed. The applicable price and plan details are shown before payment."],
      ["How long does my subscription remain active?", "Your subscription remains active for the duration stated when you purchase the plan."],
      ["When does my subscription start?", "For an individual subscription, the plan begins according to the activation terms shown during purchase. Health Circle member plans may have separate activation rules based on when each member activates their access."],
      ["Can I upgrade my plan later?", "Yes, where an upgrade option is available, you can move to an eligible higher plan according to the applicable pricing and subscription terms."],
      ["Can I switch from an individual plan to Health Circle?", "Where supported, you can choose Health Circle when purchasing or renewing your subscription according to the current plan rules."],
      ["What happens when my subscription expires?", "Some MediBank features may become unavailable after your subscription expires. Record access, retention and reactivation are handled according to the applicable plan and retention policy."],
      ["Will my medical records be deleted immediately if I do not renew?", "No immediate deletion should be assumed simply because a subscription expires. MediBank provides a defined retention period and communicates applicable timelines before permanent deletion."],
      ["Can I renew after my plan has expired?", "Yes. You may renew after expiry subject to the applicable renewal and plan-start rules."],
      ["Can I cancel my subscription?", "Subscription cancellation is handled according to the applicable plan, payment and cancellation terms displayed during purchase."],
      ["Are subscription payments refundable?", "Refund eligibility depends on MediBank's applicable refund policy and the circumstances of the transaction. Any applicable terms are presented clearly as part of the subscription process."],
    ],
  },
  {
    id: "emergency",
    label: "Emergency Access",
    eyebrow: "When it matters",
    questions: [
      ["What is Emergency Access?", "Emergency Access is designed to make important health information available during a medical emergency, particularly when you may not be able to communicate your medical history yourself."],
      ["What information can be made available during an emergency?", "Emergency information may include critical details you have chosen to make available, such as allergies, blood group, important medical conditions, current medications or other relevant health information."],
      ["Can anyone access my full medical history during an emergency?", "No. Emergency Access should not mean unrestricted access to your entire medical history. Access is designed to be limited to information and circumstances permitted by MediBank's emergency-access controls."],
      ["What happens if I am unconscious?", "Where Emergency Access has been configured, authorised healthcare professionals or permitted contacts may be able to access essential health information according to the access rules you have established."],
      ["Can I choose what information is available for emergencies?", "Yes. MediBank's approach is to keep users in control of what information is made available through emergency-access features wherever such controls are supported."],
      ["Can my emergency contact access my records?", "Emergency contacts may receive specifically authorised access depending on the permissions you have configured. Being listed as an emergency contact should not automatically provide unrestricted access to all health records."],
      ["Can I change my emergency contact?", "Yes. You can update or remove emergency contacts according to the account controls available within MediBank."],
      ["Will I know if Emergency Access has been used?", "Where technically supported, MediBank can maintain access records so emergency access remains accountable and auditable."],
      ["Is MediBank a replacement for emergency medical services?", "No. MediBank helps make health information more accessible, but it does not replace hospitals, ambulances, emergency services or medical professionals."],
    ],
  },
  {
    id: "family",
    label: "Family & Health Circle",
    eyebrow: "People you care for",
    questions: [
      ["What is the MediBank Family Tree?", "Family Tree helps you organise and manage health profiles for people close to you, such as parents, children, partners or other dependants, according to the permissions available for each profile."],
      ["What is Health Circle?", "Health Circle is a subscription option designed to make MediBank available to a group of people under one purchase while keeping each person's Health Identity and medical information separate."],
      ["Does Health Circle have to include only family members?", "No. Health Circle is designed around people you choose to include and is not necessarily restricted only to legally related family members."],
      ["How many people can be included in Health Circle?", "A Health Circle plan can support the number of members specified in the plan you purchase. For example, a four-member Health Circle includes the purchaser and additional member activations according to the applicable plan terms."],
      ["Do Health Circle members share the same medical account?", "No. Each member has their own Health Identity and health information. Health Circle connects subscription benefits, not everyone's private medical records."],
      ["Can the person who buys Health Circle automatically see everyone's medical records?", "No. Paying for another person's subscription does not automatically give you access to their medical information. Health-record access remains subject to appropriate consent and permissions."],
      ["How do I add someone to my Health Circle?", "The primary subscriber can provide an available Health Circle activation to an eligible member, who then completes the required account and activation process."],
      ["When does a Health Circle member's subscription begin?", "A member's plan begins when their Health Circle access is activated, according to MediBank's applicable activation rules."],
      ["What happens if a Health Circle member activates later than the main subscriber?", "Their membership period follows the activation rules associated with their own profile. A later activation does not necessarily shorten their entitled subscription period."],
      ["What happens when the main Health Circle subscription reaches renewal?", "The main subscriber can renew according to the available MediBank plans. Members whose existing entitlement has not yet ended can continue according to their own activation and subscription timeline."],
      ["Can I use an unused Health Circle activation later?", "Unused Health Circle activations may remain available according to the applicable validity and renewal rules of the plan."],
      ["Can I replace a Health Circle member?", "Whether an activated member can be replaced depends on the applicable Health Circle rules. An unused activation may be assigned according to the plan's eligibility requirements."],
      ["Can I manage my child's health records?", "A parent or authorised guardian may manage a dependant's profile where permitted, subject to MediBank's account, consent and age-related requirements."],
      ["Can I manage my elderly parents' health records?", "Yes, where your parent has provided the appropriate consent or where another authorised relationship applies. MediBank is designed to make family health management easier without removing individual privacy controls."],
      ["Are Health Circle members' records private from one another?", "Yes. Each person's medical information remains private. Health Circle membership alone does not allow one member to view another member's health records."],
      ["Can a Health Circle member leave the group?", "Membership and future subscription choices can be managed according to MediBank's applicable Health Circle and renewal rules. A person's Health Identity remains associated with that individual rather than becoming the property of the Health Circle owner."],
    ],
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestion, setOpenQuestion] = useState(categories[0].questions[0][0]);
  const [query, setQuery] = useState("");
  const [searchShortcut, setSearchShortcut] = useState("Ctrl K");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    setSearchShortcut(isMac ? "⌘ K" : "Ctrl K");

    const focusSearch = (event) => {
      if ((isMac ? event.metaKey : event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const active = categories.find((category) => category.id === activeCategory);
  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return active.questions;
    return categories.flatMap((category) =>
      category.questions.filter(([question, answer]) =>
        `${question} ${answer}`.toLowerCase().includes(search)
      )
    );
  }, [active, query]);

  const selectCategory = (id) => {
    setActiveCategory(id);
    setOpenQuestion(categories.find((category) => category.id === id).questions[0][0]);
    setQuery("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <section className={styles.hero}>
        <div className={styles.kicker}><Sparkles size={15} /> Help centre</div>
        <h1>Questions? We&apos;re here<br />to make things <span>clear.</span></h1>
        <p>Everything you need to know about your MediBank Health Identity, privacy, plans, emergency access and family care.</p>
        <label className={styles.search}>
          <Search size={21} aria-hidden="true" />
          <span className="sr-only">Search frequently asked questions</span>
          <input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for an answer..." />
          <kbd>{searchShortcut}</kbd>
        </label>
        <div className={styles.trust}><ShieldCheck size={18} /> Your health information stays in your control.</div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <nav className={styles.tabs} aria-label="FAQ categories">
          {categories.map((category, index) => (
            <button key={category.id} onClick={() => selectCategory(category.id)} aria-pressed={!query && activeCategory === category.id}>
              <span>0{index + 1}</span>{category.label}<small>{category.questions.length}</small>
            </button>
          ))}
        </nav>

        <div className={styles.sectionHeading}>
          <div><span>{query ? "Search results" : active.eyebrow}</span><h2 id="faq-heading">{query ? `Answers for “${query}”` : active.label}</h2></div>
          <p>{results.length} {results.length === 1 ? "answer" : "answers"}</p>
        </div>

        <div className={styles.accordion}>
          {results.map(([question, answer], index) => {
            const isOpen = openQuestion === question;
            const answerId = `faq-answer-${activeCategory}-${index}`;
            return (
              <article className={`${styles.item} ${isOpen ? styles.open : ""}`} key={question}>
                <button aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenQuestion(isOpen ? null : question)}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <span>{question}</span>
                  <span className={styles.chevron}><ChevronDown size={20} /></span>
                </button>
                <div className={styles.answer} id={answerId} hidden={!isOpen}><div><p>{answer}</p></div></div>
              </article>
            );
          })}
          {!results.length && <div className={styles.empty}><CircleHelp size={30} /><h3>No exact matches</h3><p>Try a shorter search, or choose a category below.</p></div>}
        </div>
      </section>

      <section className={styles.contact}>
        <div><span>Still curious?</span><h2>Can&apos;t find the answer you need?</h2><p>Our support team is ready to help you find your way.</p></div>
        <a href="/contact">Talk to our team <span>↗</span></a>
      </section>
    </main>
  );
}
