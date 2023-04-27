/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const content = (value: string) => css`
  position: relative;

  .sort-bar {
    display: flex;
    flex-direction: row-reverse;
    margin: 0 4% 0 0;
    fieldset {
      border: 0;
    }
    label {
      color: black;
      visibility: ${value !== "" ? "hidden" : "visible"};
    }
    .MuiSelect-select {
      color: #000000;
    }
  }

  .speed-dial {
    .MuiBox-root {
      position: fixed;
      width: auto;
      height: auto;
      bottom: 7%;
      right: 1%;
      z-index: 99;
    }
    .MuiButtonBase-root {
      background-color: #ffabab;
    }
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    flex: 1 1 35%;
    height: 30vh;
    position: relative;

    .img-icon {
      position: absolute;
      right: 5%;
      bottom: 17%;
    }

    &:nth-of-type(2n + 1) {
      margin: 1% 2% 13% 4%;
    }

    &:nth-of-type(2n) {
      margin: 1% 4% 8% 2%;
    }

    .img {
      width: 100%;
      height: 85%;
      margin-bottom: 3%;
      border-radius: 25px;
    }

    & p {
      margin: 0 0 0 2%;
      color: #a3a3a3;
    }

    & p:nth-of-type(1) {
      font-size: 1rem;
      font-weight: 600;
      color: black;
      margin-bottom: 2%;
    }

    & p:nth-of-type(2) {
      font-weight: 500;
      font-size: 0.7rem;
      color: black;
      margin-bottom: 2%;
    }

    & p:nth-of-type(3) {
      font-size: 0.625rem;
    }

    .icon {
      text-align: end;
      display: flex;
      justify-content: end;
      padding: 0 1% 0 0;
      font-weight: 900;

      .eye {
        fill: black;
        display: flex;
        align-items: center;
        & > span {
          font-size: 0.75rem;
        }

        margin-right: 5%;
      }

      .heart {
        fill: black;
        display: flex;
        align-items: center;
        & > span {
          font-size: 0.75rem;
        }
      }
    }

    .redHeart {
      fill: #ff571a;
      animation-name: change;
      animation-duration: 0.4s;

      @keyframes change {
        0% {
          fill: #ff571a;
          transform: scale(0);
        }

        60% {
          fill: #ff571a;
          transform: scale(1.3);
          border-radius: 50%;
          filter: drop-shadow(1px 1px 4px #ff571a);
        }

        100% {
          fill: #ff571a;
          transform: scale(1);
        }
      }
    }
  }
`;

export const errorMsgStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  & p {
    display: inline-block;
    width: 60%;
    text-align: center;
  }

  p:nth-of-type(1) {
    margin: 30% 0 3% 0;
    font-weight: 900;
    font-size: 1.3rem;
  }
  p:nth-of-type(2) {
    margin: 0 0 0 0;
    font-size: 1rem;
  }
  p:nth-of-type(3) {
    margin: 0 0 5% 0;
    font-size: 1rem;
  }

  & > button {
    border: none;
    display: inline-block;
    width: 60%;
    height: 4vh;
    font-size: 0.7rem;
    font-weight: 900;
    background-color: #ffabab;
    color: white;
    font-weight: 900;
    border-radius: 10px;
    font-size: 0.9rem;
  }
`;
