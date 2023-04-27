/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 프로필 스타일
export const profileStyle = css`
  display: flex;
  justify-content: space-between;
  width: 92%;
  height: 12%;
  padding: 0 4% 0 4%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);

  .user-info {
    display: flex;
    width: 60%;
    align-items: center;

    img {
      width: 24%;
      height: 6vh;
      border-radius: 50px;
      margin: 0 4% 0 0;
    }

    p {
      font-weight: 900;
      font-size: 1.25rem;
    }
  }

  button {
    border: 0;
    background: none;
    font-weight: 900;
    font-size: 1.25rem;
  }
`;

// 컨탠츠 스타일
export const contentStyle = (HEIGHT: number) => css`
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin: 0 0 0 4%;
  height: ${`${HEIGHT}%`};
  p:nth-child(1) {
    font-weight: 900;
    font-size: 1.1875rem;
    margin-top: 7%;
    margin-bottom: 3%;
  }
  .content {
    display: flex;
    align-items: center;
    p {
      font-size: 0.8;
    }
    .icon {
      margin: 0 5% 0 0;
    }
    .title {
      font-weight: 900;
    }
  }
`;
