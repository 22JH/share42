import { css, keyframes } from "@emotion/react";

export const pulse = keyframes`
  30% {
    transform: scale(1.5);
  }
  60% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

export const FaHeartStyle = css`
  transition: color 0.5s ease, transform 0.5s ease;

  &.like {
    color: red;
    animation: ${pulse} 0.5s ease;
  }
`;