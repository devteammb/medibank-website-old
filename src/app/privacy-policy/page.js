import LegalPolicyPage from "@/components/LegalPolicyPage";

const p = (text) => ({ type: "paragraph", text });
const l = (...items) => ({ type: "list", items });

export const privacyPolicySections = [
  { title: "1. Introduction", content: [p("This Privacy Policy explains how MediBank collects, uses, and protects personal and sensitive personal data in compliance with:"), l("Digital Personal Data Protection Act, 2023 (DPDP Act)", "IT Act, 2000 & SPDI Rules")] },
  { title: "2. Data We Collect", content: [
    { type: "label", text: "A. Personal Data" }, l("Name, phone number, email", "Date of birth, gender"),
    { type: "label", text: "B. Sensitive Personal Data (Health Data)" }, l("Medical records", "Prescriptions", "Lab reports", "Health history"),
    { type: "label", text: "C. Technical Data" }, l("IP address", "Device information", "Usage logs"),
    { type: "label", text: "D. Financial Data" }, l("Payment transaction metadata (processed via third parties)"),
  ] },
  { title: "3. Purpose of Data Processing", content: [p("We process data for:"), l("Providing core services", "Record storage and retrieval", "Enabling sharing with doctors", "Improving platform functionality", "Legal compliance")] },
  { title: "4. Consent (DPDP Compliance)", content: [l("Data is processed only with your explicit consent", "Consent can be withdrawn at any time", "Withdrawal may limit service functionality")] },
  { title: "5. Data Sharing", content: [p("We may share data with:"), l("Doctors (with user consent)", "Third-party service providers (cloud, AI, analytics)", "Payment gateway providers", "Government authorities (if legally required)"), p("We do not sell personal data.")] },
  { title: "6. Third-Party APIs", content: [p("We use APIs such as:"), l("Google APIs", "AI/ML service providers", "Payment gateway APIs"), p("These providers may process data under their own privacy policies.")] },
  { title: "7. Data Storage & Security", content: [p("We implement:"), l("Encryption (at rest & in transit)", "Access control mechanisms", "Secure cloud infrastructure"), p("However, no system is 100% secure.")] },
  { title: "8. Data Retention", content: [l("Data is retained as long as necessary for service delivery", "Users may request deletion (subject to legal obligations)")] },
  { title: "9. User Rights (Under DPDP Act)", content: [p("You have the right to:"), l("Access your data", "Correct inaccuracies", "Request deletion", "Withdraw consent", "Nominate a representative"), p("Requests can be made via contact details below.")] },
  { title: "10. Children's Data", content: [l("We do not knowingly collect data from minors without parental consent")] },
  { title: "11. Cross-Border Data Transfer", content: [l("Data may be stored or processed outside India", "Only in jurisdictions permitted under Indian law")] },
  { title: "12. Cookies Policy", content: [p("We use cookies to:"), l("Improve user experience", "Analyze traffic"), p("Users can manage cookies via browser settings.")] },
  { title: "13. Data Breach Notification", content: [p("In case of a breach:"), l("Users will be notified as required by law", "Authorities will be informed where applicable")] },
  { title: "14. Grievance Redressal", content: [p("Grievance Officer Name: Srilatha Vangaveti\nEmail: complaints@medibank.in\nResponse Timeline: Within 15 days")] },
  { title: "15. Changes to Policy", content: [p("We may update this policy periodically. Continued use implies acceptance.")] },
];

export const metadata = { title: "Privacy Policy | MediBank" };

export default function PrivacyPolicyPage() {
  return <LegalPolicyPage title="Privacy Policy" updated="30-03-2026" sections={privacyPolicySections} />;
}
