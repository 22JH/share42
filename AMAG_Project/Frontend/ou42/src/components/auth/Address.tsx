/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DropDown from "../UI/DropDown";

interface PropType {
  setSi: React.Dispatch<React.SetStateAction<string>>;
  setGoon: React.Dispatch<React.SetStateAction<string>>;
  setDong: React.Dispatch<React.SetStateAction<string>>;
}

const container = css`
  display: flex;
  height: 15vh;
  width: 75%;
  flex-direction: column;

  .addrHeader {
    margin-bottom: 10px;
  }

  .selectAddr {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
  }
`;

export default function Address({ setSi, setGoon, setDong }: PropType) {
  const ciOption = ["대구광역시", "2", "3", "4", "5"];
  const guOption = ["1", "2", "3", "4", "5"];
  const dongOption = ["1", "2", "3", "4", "5"];

  return (
    <div css={container}>
      <div className="addrHeader">Address</div>
      <div className="selectAddr">
        <DropDown data={ciOption} content={"시/도"} setValue={setSi} />
        <DropDown data={guOption} content={"시/군/구"} setValue={setGoon} />
        <DropDown data={dongOption} content={"동"} setValue={setDong} />
      </div>
      <TextField size="small" placeholder="자세한 주소를 입력해 주세요" />
    </div>
  );
}
