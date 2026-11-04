import { Seo } from "@/components/Seo";
import PrivacyPolicyClientSide from "@/features/privacyPolicy/components/PrivacyPolicyClientSide";

function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Політика конфіденційності | MS STUDIO LASER"
        description="Політика конфіденційності та обробки персональних даних студії MS STUDIO LASER у Львові."
        path="/privacy-policy"
      />
      <PrivacyPolicyClientSide />
    </>
  );
}

export default PrivacyPolicy;
