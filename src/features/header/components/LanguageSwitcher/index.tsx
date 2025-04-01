import { useTranslation } from "react-i18next";
import { ButtonWrapper, LanguageButton } from "./styled";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language

  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ButtonWrapper>
      {selectedLanguage === "ua" ? (
        <LanguageButton onClick={() => handleLanguage("en")}>UA</LanguageButton>
      ) : (
        <LanguageButton onClick={() => handleLanguage("ua")}>EN</LanguageButton>
      )}
    </ButtonWrapper>
  );
};

export default LanguageSwitcher;
