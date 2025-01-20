import { useTranslation } from "react-i18next";
import PrivacyPolicyClient from "@/components/PrivacyPolicyClient";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <PrivacyPolicyClient />
  );
}

export default PrivacyPolicy;
