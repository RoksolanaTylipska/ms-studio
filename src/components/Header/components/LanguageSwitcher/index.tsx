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
      {selectedlanguage === "ua" ? (
        <LanguageButton onClick={() => handleLanguage("en")}>UA</LanguageButton>
      ) : (
        <LanguageButton onClick={() => handleLanguage("ua")}>EN</LanguageButton>
      )}
    </ButtonWrapper>
  );
};

export default LanguageSwitcher;
