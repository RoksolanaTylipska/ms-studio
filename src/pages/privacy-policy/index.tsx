import PrivacyPolicyClientSide from "@/components/PrivacyPolicyClientSide";
import { useTranslation } from "react-i18next";

function PrivacyPolicy() {
  const { t } = useTranslation();

  return <PrivacyPolicyClientSide />;
}

export default PrivacyPolicy;
