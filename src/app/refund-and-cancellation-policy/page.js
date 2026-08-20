import LegalPolicyPage from "@/components/LegalPolicyPage";

const p = (text) => ({ type: "paragraph", text });
const l = (...items) => ({ type: "list", items });
const label = (text) => ({ type: "label", text });

export const refundPolicySections = [
  { title: "1. Introduction", content: [p('This Refund & Cancellation Policy ("Policy") governs payments made by users on the MediBank platform, operated by Sushrut Healthtech Pvt Ltd (CIN: U86900TS2025PTC198558), having its registered office at WeWork - Raheja Mindspace, 13th Floor, Building 9, Survey No. 64, Madhapur, Hyderabad, Telangana 500081.'), p("By purchasing any subscription or service on MediBank, you agree to this Policy.")] },
  { title: "2. Nature of Services", content: [p("MediBank provides digital health record storage, management, and sharing services, along with related technology features."), p("Payments made on the platform are for access to these technology services and not for medical advice or treatment.")] },
  { title: "3. Subscription Plans", content: [l("All subscriptions (if applicable) are billed in advance.", "Subscription details, pricing, and features will be displayed clearly at the time of purchase.", "Users are responsible for reviewing plan details before making a payment.")] },
  { title: "4. Cancellation Policy", content: [l("Users may cancel their subscription at any time through their account settings or by contacting support."), p("Upon cancellation:"), l("Access to paid features will continue until the end of the current billing cycle.", "No further charges will be applied for subsequent billing cycles.")] },
  { title: "5. Refund Policy", content: [label("5.1 General Rule"), p("All payments made on MediBank are non-refundable, except in the cases explicitly mentioned below."), label("5.2 Eligible Refund Scenarios"), p("Refunds may be issued in the following cases:"), l("Duplicate payment made due to technical error", "Payment deducted but service not activated", "Failed transaction where money is debited but not credited to MediBank", "Unauthorized transaction (subject to verification)"), label("5.3 Non-Refundable Scenarios"), p("Refunds will NOT be provided in the following cases:"), l("Partial use of subscription period", "Change of mind after purchase", "Lack of usage of the platform", "Dissatisfaction with features where services have been delivered as described", "Any misuse or violation of Terms & Conditions")] },
  { title: "6. Refund Process", content: [l("Users must raise a refund request by emailing complaints@medibank.in"), p("The request must include:"), l("Registered email/phone number", "Transaction details", "Reason for refund"), p("MediBank reserves the right to request additional information for verification.")] },
  { title: "7. Refund Timeline", content: [l("Approved refunds will be processed within 7-10 business days", "The amount will be credited to the original payment method", "Timelines may vary depending on the payment provider or bank")] },
  { title: "8. Payment Gateway Disclaimer", content: [l("Payments on MediBank are processed through secure third-party payment gateway providers", "MediBank does not store complete financial or card details", "Any payment disputes may also be subject to the policies of the respective payment provider")] },
  { title: "9. Modifications to Policy", content: [p("MediBank reserves the right to modify this Policy at any time. Changes will be effective upon posting on the website.")] },
  { title: "10. Contact Details", content: [p("For any queries or refund requests:\nGrievance Officer: Srilatha Vangaveti\nEmail: complaints@medibank.in\nResponse Time: Within 15 days")] },
];

export const metadata = { title: "Refund & Cancellation Policy | MediBank" };

export default function RefundAndCancellationPolicyPage() {
  return (
    <LegalPolicyPage
      title="Refund & Cancellation Policy"
      subtitle="MediBank (Sushrut Healthtech Pvt Ltd)"
      updated="30-03-2026"
      sections={refundPolicySections}
    />
  );
}
