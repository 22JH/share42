import React from "react";

export interface UserReportDivProps {
  typeSelect: number;
  handleTypeSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UserReportDiv = ({
  typeSelect,
  handleTypeSelect
}: UserReportDivProps) => {

  return (
    <div
      style={{
        width: "96vw",
        height: "7vh",
        borderBottom: "1px solid #CDCDCD",
        lineHeight: "8vh",
        paddingLeft: "4vw",
        marginTop: "6vh",
      }}
    >
      <label
        style={{
          fontSize: "1rem",
          fontWeight: "900",
          marginRight: "2vw"
        }}
      >
        <input
          type="radio"
          value="0"
          checked={typeSelect === 0}
          onChange={handleTypeSelect}
        />
        공유글 신고
      </label>
      <label
        style={{
          fontSize: "1rem",
          fontWeight: "900",
        }}
      >
        <input
          type="radio"
          value="1"
          checked={typeSelect === 1}
          onChange={handleTypeSelect}
        />
        공유함 칸 신고
      </label>
    </div>
  );
};

export default UserReportDiv;
