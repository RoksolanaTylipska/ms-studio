import styled from "@emotion/styled";
import palette from "@/theme/palette";

export const BannerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 74px;
  height: 600px;
  background-color: ${palette.beige};

  @media (min-width: 600px) {
    height: 600px;
`;

export const ImageContainer = styled.div`
  bottom: 0;
  width: 500px;
  margin: auto;

  @media (min-width: 600px) {
    position: absolute;
    width: 700px;

`;

