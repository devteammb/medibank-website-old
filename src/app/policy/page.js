import LegalPolicyPage from "@/components/LegalPolicyPage";
import { privacyPolicySections } from "@/app/privacy-policy/page";
import { termsAndConditionsSections } from "@/app/terms-and-conditions/page";
import { refundPolicySections } from "@/app/refund-and-cancellation-policy/page";

const policies = {
  privacy: {
    title: "Privacy Policy",
    sections: privacyPolicySections,
  },
  terms: {
    title: "Terms & Conditions",
    sections: termsAndConditionsSections,
  },
  refund: {
    title: "Refund & Cancellation Policy",
    subtitle: "MediBank (Sushrut Healthtech Pvt Ltd)",
    sections: refundPolicySections,
  },
};

export const metadata = {
  title: "Policies | MediBank",
  description: "Read MediBank's privacy, terms, refund, and cancellation policies.",
};

export default function PolicyPage({ searchParams }) {
  const activePolicy = Object.hasOwn(policies, searchParams?.view)
    ? searchParams.view
    : "privacy";
  const policy = policies[activePolicy];

  return (
    <LegalPolicyPage
      {...policy}
      activePolicy={activePolicy}
      updated="30-03-2026"
    />
  );
}
