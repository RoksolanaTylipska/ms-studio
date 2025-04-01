import { privacyPolicy } from "@/features/privacyPolicy/constants/privacyPolicy";
import { List, ListItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PrivacyPolicyContainer, TermsContainer } from "./styled";

function PrivacyPolicyClientSide() {
  const { t } = useTranslation();

  return (
    <PrivacyPolicyContainer className="section">
      <Typography
        sx={{ textAlign: "left", fontSize: "30px" }}
        variant="bodyComfortaa"
      >
        {t("privacyPolicy.title")}
      </Typography>
      <Typography sx={{ marginTop: "15px" }} variant="body">
        {t("privacyPolicy.intro")}
      </Typography>

      {privacyPolicy.map((section, index) => (
        <TermsContainer key={index}>
          <Typography variant="h5">{t(section.title)}</Typography>
          <Typography variant="body">{t(section.description)}</Typography>

          {section.list && (
            <List>
              {section.list.map((item, i) => (
                <ListItem key={i} sx={{ padding: "3px 20px" }}>
                  <Typography variant="body">{t(item)}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </TermsContainer>
      ))}
    </PrivacyPolicyContainer>
  );
}

export default PrivacyPolicyClientSide;
