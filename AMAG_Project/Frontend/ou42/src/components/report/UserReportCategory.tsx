/** @jsxImportSource @emotion/react */

import { ReportCategorySelectStyle } from "../share/style/UserShareStyle";
import { UserReportCategoryProps } from "./type/UserReportType";

const UserReportCategory = ({
  handleSelectCategory,
  options,
  category,
  title,
  stationLst,
  lockerLst,
}: UserReportCategoryProps) => {
  return (
    <div
      style={{
        marginTop: "2vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        css={ReportCategorySelectStyle}
      >
        <span
          style={{
            width: '92%',
            fontWeight: '900',
            marginBottom: '1vh',
            textAlign: "left"
          }}
        >{title}</span>
        {title === "지점 선택" ? (
          <select value={category} onChange={handleSelectCategory}>
            {stationLst?.map((station, index) => (
              <option key={index} value={station.id}>
                {station.address !== ""
                  ? `${station.name} (${station.address})`
                  : `${station.name}`}
              </option>
            ))}
          </select>
        ) : null}
        {title === "라커 선택" ? (
          <select value={category} onChange={handleSelectCategory}>
            {lockerLst?.map((station, index) => (
              <option key={index} value={station.id}>
                {station.lockerNumber !== 0
                  ? `${station.lockerNumber}`
                  : `라커함을 선택해주세요`}
              </option>
            ))}
          </select>
        ) : null}
        {title === "문의 분류" ? (
          <select value={category} onChange={handleSelectCategory}>
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.category}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    </div>
  );
};

export default UserReportCategory;
