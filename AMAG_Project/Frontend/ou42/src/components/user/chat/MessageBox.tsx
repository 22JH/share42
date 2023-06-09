/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
import profile from "../../../assets/testObject.jpg";

interface PropType {
  data: any;
  sender: string;
}

const container = css`
  width: 100%;
  height: 82vh;
  overflow: scroll;

  .senderMsg,
  .receiverMsg {
    height: auto;
    width: auto;
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .senderMsg {
    height: 7vh;
    width: 100%;
    display: flex;
    justify-content: end;
  }

  .imgBox {
    width: 6vh;
    height: 6vh;
    border-radius: 70%;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin: 0 10px;
    .profile {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const receiverContent = (len: number) => css`
  width: ${len * 18 < 250 ? len * 18 : 250}px;
  height: ${len * 18 < 240 ? 4 : 4 + ((len * 18) / 250) * 1.2}vh;
  background-color: #fcc8d1;
  color: white;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0 10px;
  flex-wrap: wrap;
  word-break: break-all;
`;
const senderContent = (len: number) => css`
  width: ${len * 18 < 250 ? len * 18 : 250}px;
  height: ${len * 18 < 240 ? 4 : 4 + ((len * 18) / 250) * 1.2}vh;
  background-color: #ffabab;
  color: white;
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: 20px;
  padding: 0 10px;
  flex-wrap: wrap;
  word-break: break-all;
  margin-right: 10px;
`;

export default function MessageBox({ data }: any) {
  function getStringByte(str: string): number {
    let byte = 0;
    for (let i = 0; i < str.length; i++) {
      byte += str.charCodeAt(i) > 127 ? 3 : 1.4;
    }
    return byte / 3;
  }
  const loginObject = localStorage.getItem("loginInfo")!;
  const { userId } = JSON.parse(loginObject);

  const ref = useRef<any>();
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);
  return (
    <div css={container}>
      {data?.map((ele: any, idx: number) =>
        ele?.senderId === userId ? (
          <div key={idx} className="senderMsg">
            <div css={senderContent(getStringByte(ele?.msg))}>
              <div>{ele?.msg}</div>
            </div>
          </div>
        ) : (
          <div className="receiverMsg">
            <div className="imgBox">
              <img src={profile} alt="profile" className="profile" />
            </div>
            <div css={receiverContent(getStringByte(ele?.msg))}>
              <div>{ele?.msg}</div>
            </div>
          </div>
        )
      )}
      <div ref={ref} />
    </div>
  );
}
