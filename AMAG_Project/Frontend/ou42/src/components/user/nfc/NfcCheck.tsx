import { useState, useEffect } from "react";
import AlertDialogSlide from "../../UI/AlertDialog";
import NfcSvg from "./NfcSvg";
import axios from "axios";
import { useGetUserToken } from "../../../hooks/useGetToken";
import { useNavigate } from "react-router-dom";

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
  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcReading, setNfcReading] = useState(false);
  const [nfcData, setNfcData] = useState("");

  const navigate = useNavigate();

  const TOKEN = useGetUserToken();
  const url = (status: number) => {
    if (status == 0) {
      return `/api/user/share/borrow/nfc/open/${nfcData}`;
    } else if (status == 1) {
      return `/api/user/share/return/nfc/open/${nfcData}`;
    } else if (status == 2) {
      return `/api/user/share/keep/nfc/open/${nfcData}`;
    } else if (status == 3)
      return `/api/user/share/collect/nfc/open/${nfcData}`;
  };

  const startNfcReading = async () => {
    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      setNfcReading(true);
      // console.log(reader)
      reader.addEventListener("reading", (res: Res) => {
        // NFC 태그를 읽은 후 처리할 코드를 작성합니다.
        setNfcData(res.serialNumber);
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 브라우저가 Web NFC API를 지원하는지 확인합니다.
    if ("NDEFReader" in window) {
      setNfcSupported(true);
      startNfcReading().then(() => {
        axios({
          method: "post",
          url: `https://www.share42-together.com${url(status)}`,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
          .then(() => {
            navigate("/home");
          })
          .catch((err) => {});
      });
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
