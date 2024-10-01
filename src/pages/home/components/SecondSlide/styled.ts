import styled from "@emotion/styled";

interface SlideContainerSecondProps {
  selectedlanguage: string
}

export const SlideContainerSecond = styled.div`
  width: 90%;
  height: 100%;
  background-image: url("/assets/photos/carousel_2.webp");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  margin: auto;
`;

export const Wrapper = styled.div<SlideContainerSecondProps>`
  padding-top: 140px;
  position: relative;
  margin: auto;
  width: ${({ selectedlanguage }) => {
    switch (selectedlanguage) {
      case "en":
        return "850px"
        default:
          return "770px";
      
    }
  }};
`;

export const Title = styled.h1`
  font-size: 80px;
  margin: auto;
  text-transform: uppercase;
  line-height: 80px;
`;