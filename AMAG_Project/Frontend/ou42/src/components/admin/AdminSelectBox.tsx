/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Area } from "../../routes/admin/AdminLog";
import { useLocation } from "react-router-dom";
import { AxiosResponse } from "axios";
import { memo } from "react";

import Btn from "./../UI/Btn";

const container = (pathName: string) => css`
  width: 90%;
  margin: 0 5% 0 5%;
  height: auto;
  p {
    font-weight: 900;
    margin: 5% 0 3% 0;
  }

  select {
    width: 100%;
    height: 5vh;
    border-radius: 5px;
    border: #a5a5a5 1px solid;
    outline: 0 none;
    background: none;
    &:focus {
      border: #a5a5a5 1px solid;
    }

    color: #000000;

    &:nth-of-type(2) {
      margin: ${pathName === "/admin/operation" ? "0 0 0 0" : "0 0 8% 0"};
    }
  }
`;

interface Props {
  regionData?: AxiosResponse<any, any>;
  pointData?: AxiosResponse<any, any>;
  numberData?: AxiosResponse<any, any>;
  listData?: AxiosResponse<any, any>;
  setAreaInfo: React.Dispatch<React.SetStateAction<Area>>;
  areaInfo: Area;
}

function AdminSelectBox(props: Props) {
  const { regionData, pointData, numberData, setAreaInfo, areaInfo } = props;

  const location = useLocation();
  const pathName = location.pathname;

  const options = [
    { value: "서울", text: "서울" },
    { value: "대구", text: "대구" },
    { value: "대전", text: "대전" },
  ];

  // 지역 선택 함수
  const clickArea = (e: React.MouseEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (areaInfo?.region !== value) {
      setAreaInfo!((info) => {
        return { ...info, region: value };
      });
    }
  };

  // 지점 선택 함수
  const clickBranch = (e: React.MouseEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (areaInfo?.point !== value) {
      setAreaInfo!((info) => {
        return { ...info, point: value };
      });
    }
  };

  // 번호 선택 함수
  const clickNumber = (e: React.MouseEvent<HTMLSelectElement>) => {
    const value = (e.target as HTMLSelectElement).value;
    if (areaInfo?.number !== value) {
      setAreaInfo!((info) => {
        return { ...info, number: value };
      });
    }
  };

  // 열기 버튼 함튼
  const open = () => {
    console.log("열기");
  };

  return (
    <div css={container(pathName)}>
      <p>지역선택</p>
      <select onClick={clickArea}>
        <option value="">지역을 선택해주세요</option>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      <p>지점선택</p>
      <select onClick={clickBranch}>
        <option value="">지점을 선택해주세요</option>
        {options.map((option, index) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      {pathName === "/admin/operation" ? (
        <>
          <p>번호선택</p>
          <select onClick={clickNumber}>
            <option value="">번호를 선택해주세요</option>
            {options.map((option, index) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <Btn
            width={100}
            height={"4.5vh"}
            color={"white"}
            backGroundColor={"#ff4f4f"}
            content={"열기"}
            border={"1px solid #ff4f4f"}
            marginTop={30}
            fontWeight={900}
            onClick={open}
          />
        </>
      ) : null}
    </div>
  );
}

export default memo(AdminSelectBox);
