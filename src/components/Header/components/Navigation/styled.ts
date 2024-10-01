import styled from "@emotion/styled";

export const NavList = styled.ul`
  display: flex;
  text-transform: uppercase;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  height: 100%;
  padding: 0;
  font-size: 20px;
  margin-bottom: 70px;
  margin-top: 100px;

  @media (min-width: 600px) {
    flex-direction: row;
    row-gap: 0;
    font-size: 13px;
    margin-bottom: 0;
    margin-top: 0

`;

export const NavItem = styled.li`
  width: max-content;
  margin: 0;
  padding: 0;
  font-size: 17px;
  justify-content: center;

  a {
    &:hover {
      color: '#D9C6A4';
    }
  }
`;
