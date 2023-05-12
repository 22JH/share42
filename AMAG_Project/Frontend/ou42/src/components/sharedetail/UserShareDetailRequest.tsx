import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserShareDetailRequestProps } from "./type/UserShareDetailType";

const UserShareDetailRequest = ({
  useRequest,
  handleUseRequest,
  handleUseCancel,
  handleNFC,
  handleChating,
  data,
}: UserShareDetailRequestProps) => {
  const { id } = useParams();

  return (
    <div
      style={{
        width: "85vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2vh",
        marginBottom: "2vh",
        fontWeight: "900",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* toLocaleString() */}
        <span>{`${Number(data?.sharePrice).toLocaleString()}원`}</span>
        <span
          style={{
            color: "#adadad",
            fontWeight: "500",
          }}
        >
          {data?.accountSigungu} {data?.accountDong}
        </span>
      </div>
      <div>
        {useRequest ? (
          <>
            <button
              style={{
                color: "#ffffff",
                backgroundColor: "#909090",
                border: "none",
                borderRadius: "5px",
                boxShadow: "2px 2px 5px #00000051",
                padding: "1.4vh 4vw",
              }}
              onClick={() => handleUseCancel(id)}
            >
              사용취소
            </button>
            <div
              style={{
                position: "fixed",
                bottom: "12vh",
                right: "8vw",
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "5rem",
                backgroundColor: "red",
                color: "white",
                fontWeight: "900",
              }}
              onClick={handleNFC}
            >
              NFC
            </div>
          </>
        ) : (
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "#FFABAB",
              border: "none",
              borderRadius: "5px",
              boxShadow: "2px 2px 5px #00000051",
              padding: "1.4vh 4vw",
            }}
            onClick={() => handleUseRequest(id)}
          >
            사용신청
          </button>
        )}
        <button
          style={{
            marginLeft: "3vw",
            color: "#ffffff",
            backgroundColor: "#FFABAB",
            border: "none",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px #00000051",
            padding: "1.4vh 4vw",
          }}
          onClick={handleChating}
        >
          채팅하기
        </button>
      </div>
    </div>
  );
};

export default UserShareDetailRequest;
