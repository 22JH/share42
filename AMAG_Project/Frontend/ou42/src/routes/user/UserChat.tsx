/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BottomMenuBar from "../../components/BottomMenuBar";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import MessageBox from "../../components/user/chat/MessageBox";

const container = css`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  .chatSection {
    height: 80%;
    width: 100%;
    overflow: scroll;
  }
  .sendMsg {
    display: flex;
    flex-direction: row;
    height: 20%;
    width: 100%;
    justify-content: center;
    .sendField {
      width: 80%;
      margin-right: 10px;
    }
    .sendBtn {
      width: 20%;
      height: auto;
    }
  }
`;

interface ws {
  send: any;
  onopen: any;
  onclose?: any;
  onmessage: any;
  close?: any;
}

//////////////////// 임시데이터 ////////////
const sender = "김지현";
const receiver = "이주형";

const tempData = [
  { sender: "asdf", content: "asdfasdf", fff: ";;;" },
  { sender: "asdf", content: "ㅇㄴㄹㄴ", fff: ";;;" },
  {
    sender: "김지현",
    content: "ㅎㅇㅎqweqweqwe  qwr qwef q  wdfwq fㅇ",
    fff: ";;;",
  },
  { sender: "asdf", content: "asdfasdf", fff: ";;;" },
  { sender: "asdf", content: "ㄷㄷ", fff: ";;;" },
  { sender: "asdf", content: "asdfasdf", fff: ";;;" },
  {
    sender: "김지현",
    content: "ㅎㅇwef ewfwef wef wefwe f wefw efㅎㅇ",
    fff: ";;;",
  },
  { sender: "asdf", content: "ㄷㄷ", fff: ";;;" },
  { sender: "asdf", content: "asdfasdf", fff: ";;;" },
  {
    sender: "김지현",
    content: "ㅎㅇwef ewfwef wef wefwe f wefw efㅎㅇ",
    fff: ";;;",
  },
  {
    sender: "asdf",
    content: "asdfasdasdfasfasdfsadfadfaefwfwefwfewefsfasfasdff",
    fff: ";;;",
  },
  { sender: "김지현", content: "ㅎㅇㅎㅇ", fff: ";;;" },
  { sender: "asdf", content: "ㅋㅋㅋ", fff: ";;;" },
];

export default function UserChat() {
  const [msg, setMsg] = useState<string>("");
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();
  // const [chatt, setChatt] = useState([]);

  const ws: any = useRef(null); //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

  // const msgBox = chatt.map((item, idx) => (
  //     <div key={idx} className={item.name === name ? 'me' : 'other'}>
  //         <span><b>{item.name}</b></span> [ {item.date} ]<br/>
  //         <span>{item.msg}</span>
  //     </div>
  // ));

  // useEffect(() => {
  //   if (socketData !== undefined) {
  //     const tempData = chatt.concat(socketData);
  //     console.log(tempData);
  //     setChatt(tempData);
  //   }
  // }, [socketData]);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.100.86:8088/chat/user-1");

    return () => ws.current.close();
  }, []);

  //webSocket
  //webSocket
  const handleMsg = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMsg(e.target.value);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://192.168.100.86:8088/chat/user-1");

    ws.current.onmessage = (message: any) => {
      // const dataSet = JSON.parse(message.data);
      console.log(message);
      // setSocketData(dataSet);
    };
  }, []);

  const send = useCallback(() => {
    console.log("보냄");
    if (!chkLog) {
      webSocketLogin();
      setChkLog(true);
    }

    const data = {
      sender, // 접속한 유저 이름
      receiver, // 보내는 상대 이름
      content: msg,
      roomName: "user-1", // api 받아서 바꿔야함, 주소와 동일하게,
    }; //전송 데이터(JSON)

    const temp = JSON.stringify(data);

    if (ws.current.readyState === 0) {
      //readyState는 웹 소켓 연결 상태를 나타냄
      ws.current.onopen = () => {
        //webSocket이 맺어지고 난 후, 실행
        console.log(ws.current.readyState);
        ws.current.send(temp);
      };
    } else {
      ws.current.send(temp);
    }

    setMsg("");
  }, []);

  // const 끊기 = () => {
  //   ws.current.close();
  // };
  return (
    <div css={container}>
      <div className="chatSection">
        <MessageBox data={tempData} sender={sender} />
      </div>
      <div className="sendMsg">
        <TextField
          size="small"
          placeholder="메세지를 입력해 주세요"
          onChange={handleMsg}
          className="sendField"
        />
        {/* <div className="sendZone"> */}
        <RiSendPlaneFill
          onClick={send}
          css={{ width: "10%", height: "23%", color: "tomato" }}
        />
        {/* </div> */}
      </div>
      <BottomMenuBar />
    </div>
  );
}
