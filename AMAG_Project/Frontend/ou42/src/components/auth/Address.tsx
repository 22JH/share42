/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import { addrType } from "../../routes/auth/SignUp";
import { useState } from "react";

interface PropType {
  setAddr: React.Dispatch<React.SetStateAction<Partial<addrType>>>;
}

const container = css`
  display: flex;
  height: 15vh;
  width: 75%;
  flex-direction: column;

  .addrHeader {
    margin-bottom: 5px;
  }

  .selectOption {
  }
`;

export default function Address({ setAddr }: PropType) {
  const [selected, setSelected] = useState<number>(0);
  const ciOption = [1, 2, 3, 4, 5];
  const guOption = [1, 2, 3, 4, 5];
  const dongOption = [1, 2, 3, 4, 5];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temp = e.target as HTMLSelectElement;
    console.log(temp.value);
    // setSelected(e.target as HTMLSelectElement);
  };
  return (
    <div css={container}>
      <div className="addrHeader">Address</div>
      <div className="selectAddr">
        <select onChange={handleSelect} value={selected}>
          {ciOption.map((ele, idx) => (
            <option value={ele} key={idx} className="selectOption">
              {ele}
            </option>
          ))}
        </select>
        <select onChange={handleSelect} value={selected}>
          {ciOption.map((ele, idx) => (
            <option value={ele} key={idx} className="selectOption">
              {ele}
            </option>
          ))}
        </select>
        <select onChange={handleSelect} value={selected}>
          {ciOption.map((ele, idx) => (
            <option value={ele} key={idx} className="selectOption">
              {ele}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
