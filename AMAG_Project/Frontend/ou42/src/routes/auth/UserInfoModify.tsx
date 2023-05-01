/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import profile from "../../assets/testObject.jpg";
import { AiFillCamera } from "react-icons/ai";
import { TextField } from "@mui/material";
import DropDown from "../../components/UI/DropDown";
import { useState } from "react";

const container = css`
  width: 100%;
  height: 85vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  .imgSection,
  .nickNameSection,
  .addrSection {
    /* border: 1px solid black; */
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgSection {
    flex: 3;
    display: flex;
    .imgBox {
      width: 7rem;
      height: 7rem;
      border-radius: 70%;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
    .profile {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cameraIcon {
      display: flex;
      width: 1.8rem;
      height: 1.8rem;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 70%;
      justify-content: center;
      align-items: center;
      background-color: white;
      position: absolute;
    }
    .iconFrame {
      display: flex;
      justify-content: end;
      align-items: end;
      width: 7rem;
      height: 7rem;
      position: absolute;
    }
  }
  .nickNameSection {
    flex: 3;
    display: flex;
    flex-direction: column;
    width: 80%;
    .title {
      width: 100%;
      display: flex;
      justify-content: start;
    }
  }
  .addrSection {
    flex: 5;
  }
`;

export default function UserInfoModify() {
  const [siData, setSiData] = useState<string[]>([]);
  const [guData, setGuData] = useState<string[]>([]);
  const [dongData, setDongData] = useState<string[]>([]);

  return (
    <div css={container}>
      <div className="imgSection">
        <div className="imgBox">
          <img src={profile} alt="profile" className="profile" />
        </div>
        <div className="iconFrame">
          <div className="cameraIcon">
            <AiFillCamera size="22" />
          </div>
        </div>
      </div>
      <div className="nickNameSection">
        <div className="title">닉네임</div>
        <TextField id="standard-basic" variant="standard" fullWidth />
      </div>
      <div className="addrSection">
        <div className="title">주소</div>
        <div className="dropDownSection">
          {/* <DropDown content="123123" setValue={setSiData} /> */}
          {/* <DropDown content="123123" setValue={setGuData} /> */}
          {/* <DropDown content="123123" setValue={setDongData} /> */}
        </div>
      </div>
    </div>
  );
}
