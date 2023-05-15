/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import DropDown from "../../components/UI/DropDown";
import Btn from "./../../components/UI/Btn";
import pinkBox from "../../assets/pinkBox.png";
import Alert from "./../../components/UI/Alert";
import NfcCheck from "../../components/user/nfc/NfcCheck";

const container = (selectType: boolean, selectItem: string) => css`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18%;
  .selectType {
    flex: 0.8;
    width: 85%;
    height: 100%;
    background-color: #fef2f4;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    position: relative;
    .useReturn,
    .keepTakeOut {
      position: relative;
      width: 60%;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      border-radius: 10px;
      flex: 1;
    }
    .useReturn {
      background-color: ${selectType ? null : "white"};
      box-shadow: ${selectType
        ? null
        : "inset 0 2px 5px rgba(209, 77, 114, 0.5);"};
      color: ${selectType ? "#BFBFBF" : "#D14D72"};
      margin-left: 10px;
    }
    .keepTakeOut {
      background-color: ${selectType ? "white" : null};
      box-shadow: ${selectType
        ? "inset 0 2px 5px rgba(209, 77, 114, 0.5);"
        : null};
      color: ${selectType ? "#D14D72" : "#BFBFBF"};
      margin-right: 10px;
    }
  }
  .selectItme {
    flex: 2;
    width: 85%;
  }
  .logoSection {
    display: flex;
    flex: 7;
    justify-content: center;
    align-items: center;
    background-color: ${selectItem ? "#fef2f4" : "white"};

    width: 85%;
  }
`;
//임시데이터
const tempData = ["asdf", "sdf", "1", "234234"];

export default function UserNfc() {
  // false == 사용 반납, true == 보관 회수
  const [selectType, setSelectType] = useState<boolean>(false);
  // 선택한 물품
  const [selectItem, setSelectItem] = useState<string>("");
  // dialog 컨트롤
  const [open, setOpen] = useState<boolean>(false);
  const handleUseReturn = () => {
    setSelectType(() => false);
  };
  const handleKeepTakeOut = () => {
    setSelectType(() => true);
  };

  const handleBtnClick = () => {
    if (selectItem) {
      setOpen(true);
    } else {
      Alert("error", "물품을 선택해 주세요");
    }
  };
  return (
    <div css={container(selectType, selectItem)}>
      <div className="selectType">
        <div className="useReturn" onClick={handleUseReturn}>
          사용/반납
        </div>
        <div className="keepTakeOut" onClick={handleKeepTakeOut}>
          보관/회수
        </div>
      </div>
      <div className="selectItme">
        <DropDown
          content={"물품을 선택해 주세요"}
          data={tempData}
          setValue={setSelectItem}
          width={"100%"}
          marginTop={"10px"}
          marginBottom={"30px"}
        />
        <Btn
          width={"100%"}
          height={"40px"}
          content={"NFC태그"}
          backGroundColor={selectItem ? "#FFABAB" : "gray"}
          border={null}
          color={"#FFFFFF"}
          onClick={handleBtnClick}
        />
      </div>
      <div className="logoSection">
        {!selectItem ? (
          <img src={pinkBox} alt="logo" height="auto" width="30%" />
        ) : null}
      </div>
      {open ? <NfcCheck open={open} setOpen={setOpen} /> : null}
    </div>
  );
}
