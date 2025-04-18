
import { ButtonColor, ButtonSize, ButtonType } from "@/types/button";
import { StyledPrimaryButton, StyledSecondaryButton } from "./styled";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
}

export const Button = ({ children, onClick, type = ButtonType.PRIMARY, size, color }: ButtonProps) => {
  return (
    <>
      {type === "primary" ? (
        <StyledPrimaryButton onClick={onClick} size={size}>
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
        <StyledSecondaryButton onClick={onClick} color={color} size={size}>
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
