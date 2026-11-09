
import { ButtonColor, ButtonSize, ButtonType } from "@/types/button";
import Link from "next/link";
import { StyledPrimaryButton, StyledSecondaryButton } from "./styled";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  // A real link that search engines can follow, styled the same as the button
  href?: string;
  type?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
}

export const Button = ({ children, onClick, href, type = ButtonType.PRIMARY, size, color }: ButtonProps) => {
  const link = href ? { as: Link, href } : {};

  return (
    <>
      {type === "primary" ? (
        <StyledPrimaryButton {...link} onClick={onClick} size={size}>
          {children}
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.23438 34L13.7646 18L2.23438 2"
              stroke="#E0D6D0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StyledPrimaryButton>
      ) : (
        <StyledSecondaryButton {...link} onClick={onClick} color={color} size={size}>
          {children}
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.23438 34L13.7646 18L2.23438 2"
              stroke="#E0D6D0"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StyledSecondaryButton>
      )}
    </>
  );
};
