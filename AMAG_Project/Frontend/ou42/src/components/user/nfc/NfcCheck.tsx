import { useState, useEffect } from "react";
import AlertDialogSlide from "../../UI/AlertDialog";
import NfcSvg from "./NfcSvg";

declare global {
  interface Window {
    NDEFReader?: any;
  }
}

interface PropType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NfcCheck({ open, setOpen }: PropType) {
  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcReading, setNfcReading] = useState(false);
  const [nfcData, setNfcData] = useState("");
  const [status, setStatus] = useState("nfc를 태그해줘");

  useEffect(() => {
    // 브라우저가 Web NFC API를 지원하는지 확인합니다.
    if ("NDEFReader" in window) {
      setNfcSupported(true);
    }
  }, []);
  useEffect((): any => {
    return nfcSupported ? stopNfcReading() : () => console.log("unmount");
  }, []);
  const startNfcReading = async () => {
    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      console.log(reader);
      setNfcReading(true);
      // console.log(reader)
      reader.addEventListener("reading", (num: number) => {
        // NFC 태그를 읽은 후 처리할 코드를 작성합니다.
        console.log("reader : ", reader);
        // console.log("message : ", message);
        console.log("serialNum : ", num);
        // const nfcData = message.records[0].data;
        setNfcData(nfcData);
        setStatus("태그성공");
      });
    } catch (error: any) {
      setStatus(error);
      console.error(error);
    }
  };

  const stopNfcReading = async () => {
    setNfcReading(false);
    const reader = new window.NDEFReader();
    await reader.stop();
    setStatus("멈춰");
  };

  return (
    <AlertDialogSlide
      open={open}
      setOpen={setOpen}
      title={"asdf"}
      content={nfcSupported ? <NfcSvg /> : <p>Web NFC API is not supported.</p>}
    />
    // {/* <p>asdasdasd</p> */}

    // <div>
    // {/* <button onClick={nfcReading ? stopNfcReading : startNfcReading}>
    // {nfcReading ? "Stop NFC Reading" : "Start NFC Reading"}
    // </button> */}
  );
}
