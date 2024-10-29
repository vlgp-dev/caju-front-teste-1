import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% {
    transform: translateX(-150%);
  },
  100% {
    transform: translateX(300%);
  },
`;

export const Skeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  margin: 16px;
  border-radius: 8px;
  border: 2px solid transparent;
  height: 134px;
  overflow: hidden;
  background: rgb(230, 230, 230);
  backgound-color: red;

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 30%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shine} 1s ease-in infinite;
  }
`;
