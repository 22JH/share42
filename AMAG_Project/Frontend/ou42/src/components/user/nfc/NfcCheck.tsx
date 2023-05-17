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
  status: number;
}

interface Res {
  serialNumber: string;
}

export default function NfcCheck({ open, setOpen, status }: PropType) {
  cons url = (status : number) => {
    if status == 1:

  }

  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcReading, setNfcReading] = useState(false);
  const [nfcData, setNfcData] = useState("");

  const startNfcReading = async () => {s
    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      setNfcReading(true);
      // console.log(reader)
      reader.addEventListener("reading", (res: Res) => {
        // NFC 태그를 읽은 후 처리할 코드를 작성합니다.
        console.log(res.serialNumber);
        // const nfcData = message.records[0].data;
        setNfcData(nfcData);
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 브라우저가 Web NFC API를 지원하는지 확인합니다.
    console.log(status);

    if ("NDEFReader" in window) {
      setNfcSupported(true);
      startNfcReading();
    }
  }, []);
  useEffect((): any => {
    return nfcSupported ? () => stopNfcReading() : console.log("unmount");
  }, []);

  const stopNfcReading = async () => {
    setNfcReading(false);
    const reader = new window.NDEFReader();
    await reader.stop();
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
