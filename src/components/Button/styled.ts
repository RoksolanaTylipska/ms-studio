import styled from "@emotion/styled";
import { ButtonProps } from ".";

export const StyledPrimaryButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #35302D;
  color: #F1EAE5;
  height: 40px;
  width: ${({ size }) => {
    switch (size) {
      case "small":
        return "100px";
      case "medium":
        return "150px";
      case "large":
        return "297px";
    }
  }};
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "5px 10px";
      case "large":
        return "35px 30px";
      default:
        return "10px 20px";
    }
  }};
  border-radius: 50px;
  border: none; 
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "10px";
      case "large":
        return "28px";
      default:
        return "14px";
    }
  }};

  &:hover {
    transform: scale(1.05);
  }
`;

export const StyledSecondaryButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: transparent; 
  color: ${({ color }) => {
    switch (color) {
      case "light":
        return "#ffffff";
      case "dark":
        return "#35302D";
    }
  }};
  height: 40px;
  width: ${({ size }) => {
    switch (size) {
      case "small":
        return "100px";
      case "medium":
        return "150px";
      case "large":
        return "297px";
    }
  }};
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "5px 10px";
      case "large":
        return "35px 30px";
      default:
        return "10px 20px";
    }
  }};
  border-radius: 50px;
  border: ${({ color }) => {
    switch (color) {
      case "light":
        return `2px solid #ffffff`;
      case "dark":
        return `2px solid #35302D`;
    }
  }};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "10px";
      case "large":
        return "28px";
      default:
        return "14px";
    }
  }};

  &:hover {
    transform: scale(1.05);
  }
`;
