import { privacyPolicy } from "@/constants/privacyPolicy";
import { List, ListItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PrivacyPolicyContainer, TermsContainer } from "../../components/PrivacyPolicyClient/styled";

function PrivacyPolicyClient() {
  const { t } = useTranslation();

  return (
    <PrivacyPolicyContainer>
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

export default PrivacyPolicyClient;
