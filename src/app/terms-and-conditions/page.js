import LegalPolicyPage from "@/components/LegalPolicyPage";

const p = (text) => ({ type: "paragraph", text });
const l = (...items) => ({ type: "list", items });

export const termsAndConditionsSections = [
  { title: "1. Introduction", content: [p('These Terms & Conditions ("Terms") govern access and use of the website www.medibank.in, mobile application, and doctor portal (collectively, the "Platform") operated by:\nSushrut Healthtech Pvt Ltd (CIN - U86900TS2025PTC198558)\nRegistered under the Registrar of Companies, Hyderabad, Telangana, India\nOperating under the trade name MediBank'), p("By accessing or using the Platform, you agree to be legally bound by these Terms.")] },
  { title: "2. Nature of Services", content: [p("MediBank provides:"), l("A digital health records platform for users to upload, store, manage, and share medical records", "A doctor portal for healthcare professionals to access records (with user consent)", "AI-enabled tools for organizing and analyzing health records"), { type: "label", text: "Important Disclaimer:" }, p("MediBank does NOT provide medical advice, diagnosis, or treatment. All information is for informational and record-keeping purposes only.")] },
  { title: "3. Eligibility", content: [p("You must:"), l("Be at least 18 years old (or use under guardian supervision)", "Provide accurate and complete information", "Have legal capacity to enter into binding contracts")] },
  { title: "4. User Accounts", content: [p("You agree to:"), l("Maintain confidentiality of login credentials", "Be responsible for all activities under your account", "Notify us immediately of unauthorized access"), p("We reserve the right to suspend or terminate accounts for misuse.")] },
  { title: "5. User Data & Health Records", content: [l("Users retain ownership of their health data", "By uploading data, you grant MediBank a limited license to store, process, and display data, and enable sharing as per your instructions"), p("You are responsible for ensuring:"), l("Accuracy of uploaded data", "Legal rights to upload and share such data")] },
  { title: "6. Consent-Based Data Sharing", content: [l("Health records are shared only with explicit user consent", "Users can revoke access at any time", "MediBank is not responsible for misuse once data is shared with third parties")] },
  { title: "7. Doctor Portal Terms", content: [p("Doctors agree to:"), l("Access data only with valid patient consent", "Use data solely for professional purposes", "Maintain confidentiality and comply with applicable medical laws")] },
  { title: "8. AI & Analytics Disclaimer", content: [l("AI tools are provided for assistance only", "Outputs may not always be accurate", "Should not be relied upon for medical decisions")] },
  { title: "9. Third-Party Services & APIs", content: [p("The Platform integrates third-party services including but not limited to cloud storage providers, AI/ML platforms, Google APIs, and payment gateway providers."), p("MediBank:"), l("Is not responsible for third-party service failures", "Does not control third-party privacy practices", "Requires users to comply with third-party terms where applicable")] },
  { title: "10. Payments & Subscriptions", content: [l("Certain features may require payment", "Payments are processed via third-party payment gateways", "MediBank does not store full financial details"), p("Refunds are governed by our Refund Policy and subject to payment partner rules.")] },
  { title: "11. Intellectual Property", content: [p("All Platform content, including software, branding, design, and algorithms, are owned by Sushrut Healthtech Pvt Ltd."), p("Users may not copy, distribute, or reverse engineer the Platform.")] },
  { title: "12. Prohibited Uses", content: [p("You agree not to:"), l("Upload false or illegal data", "Violate privacy rights", "Attempt to hack or disrupt the Platform", "Use data for unauthorized commercial purposes")] },
  { title: "13. Limitation of Liability", content: [p("MediBank shall not be liable for:"), l("Medical decisions made based on platform data", "Data loss due to external breaches beyond reasonable control", "Third-party service failures", "Indirect or consequential damages")] },
  { title: "14. Indemnity", content: [p("You agree to indemnify MediBank against:"), l("Claims arising from misuse of the Platform", "Violation of laws or third-party rights")] },
  { title: "15. Termination", content: [p("We may suspend or terminate access:"), l("For breach of Terms", "Legal or regulatory requirements", "Security concerns")] },
  { title: "16. Governing Law & Jurisdiction", content: [l("Governed by laws of India", "Jurisdiction: Courts of Hyderabad, Telangana")] },
  { title: "17. Grievance Officer (IT Act Compliance)", content: [p("As per Indian law:\nGrievance Officer Name: Srilatha Vangaveti\nEmail: complaints@medibank.in\nResponse Timeline: Within 15 days")] },
];

export const metadata = { title: "Terms & Conditions | MediBank" };

export default function TermsAndConditionsPage() {
  return <LegalPolicyPage title="Terms & Conditions" updated="30-03-2026" sections={termsAndConditionsSections} />;
}
