import palette from "@/theme/palette";
import styled from "@emotion/styled";
import { ButtonProps } from ".";


export const StyledButton = styled.button<ButtonProps>`
display: flex;
align-items: center;
gap: 10px;
  background-color: ${({ color }) => (color === 'gold' ? `${palette.gold}` : `${palette.skin}`)};
  color: ${({ color }) => (color === 'gold' ? `${palette.black}` : `${palette.white}`)};
  height: 40px;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '5px 10px';
      case 'large':
        return '15px 30px';
      default:
        return '10px 20px';
    }
  }};
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ color }) => (color === 'gold' ? `${palette.caramel}` : `${palette.caramel}`)};
    transform: scale(1.05);
  }
`;