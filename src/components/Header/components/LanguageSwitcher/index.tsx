import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWrapper, LanguageButton } from "./styled";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const selectedlanguage = useMemo(() => {
    if (typeof window !== "undefined") {
      return i18n.language || window.localStorage.i18n;
    }
    return i18n.language;
  }, [i18n.language]);

  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ButtonWrapper>
      <LanguageButton
        selectedlanguage="ua"
        currentLanguage={selectedlanguage}
        onClick={() => handleLanguage("ua")}
      >
        UA
      </LanguageButton>
      <LanguageButton
        selectedlanguage="en"
        currentLanguage={selectedlanguage}
        onClick={() => handleLanguage("en")}
      >
        EN
      </LanguageButton>
    </ButtonWrapper>
  );
};

export default LanguageSwitcher;
