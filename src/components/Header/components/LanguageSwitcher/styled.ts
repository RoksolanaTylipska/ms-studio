import styled from "@emotion/styled";
interface Selectedlanguage {
  selectedlanguage: string;
  currentLanguage: string;
}

export const LanguageButton = styled.button<Selectedlanguage>`
  cursor: pointer;
  margin: 0;
  padding: 0;
  justify-content: center;
  text-decoration: ${({ selectedlanguage, currentLanguage }) =>
    selectedlanguage === currentLanguage ? "underline" : "none"};
  text-underline-offset: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
