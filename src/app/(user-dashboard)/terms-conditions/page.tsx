import TermsCondition from "@/components/InfoPages/TermsCondition";
import { Metadata } from "next";

export default function TermsConditionsPage() {
  return <TermsCondition />;
}

export const metadata: Metadata = {
  title: "Terms & Conditions | Sanath MyHome",
  description: "Terms and conditions for using the Sanath MyHome platform.",
};
