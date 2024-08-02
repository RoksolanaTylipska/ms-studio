import { StyledButton } from "./styled";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'gold' | 'skin';
  size?: 'small' | 'medium' | 'large';
}


const Button = ({ children, onClick, color, size = 'medium' }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} color={color} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;