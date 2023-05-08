/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiFillCamera } from "react-icons/ai";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useApi } from "./../../hooks/useApi";
import { prePro } from "../../components/auth/Address";
import { useGetUserToken } from "./../../hooks/useGetToken";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/testObject.jpg";
import DropDown from "../../components/UI/DropDown";
import Btn from "../../components/UI/Btn";
import Alert from "./../../components/UI/Alert";

const container = css`
  width: 100%;
  height: 85vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  .imgSection,
  .nickNameSection,
  .addrSection {
    width: 80%;
    display: flex;
    justify-content: center;
  }
  .imgSection {
    height: auto;
    display: flex;
    margin: 30px 0;
    .imgBox {
      width: 7rem;
      height: 7rem;
      border-radius: 70%;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
    .profile {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cameraIcon {
      display: flex;
      width: 1.8rem;
      height: 1.8rem;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 70%;
      justify-content: center;
      align-items: center;
      background-color: white;
      position: absolute;
    }
    .iconFrame {
      display: flex;
      justify-content: end;
      align-items: end;
      width: 7rem;
      height: 7rem;
      position: absolute;
    }
  }
  .nickNameSection {
    height: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 20px 0;
    .title {
      width: 100%;
      display: flex;
      justify-content: start;
    }
  }
  .addrSection {
    height: auto;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 20px 0;
    .dropDownSection {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .title {
      width: 100%;
      display: flex;
      justify-content: start;
      margin-bottom: 20px;
    }
  }
`;

export default function UserInfoModify() {
  const navigate = useNavigate();

  const [siData, setSiData] = useState<string[]>([]);
  const [guData, setGuData] = useState<string[]>([]);
  const [dongData, setDongData] = useState<string[]>([]);

  const [si, setSi] = useState<string>("");
  const [goon, setGoon] = useState<string>("");
  const [dong, setDong] = useState<string>("");
  const [addr, setAddr] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  const GET_SI_URL = `http://k8d102.p.ssafy.io:8088/api/common/address/sido`;
  const GET_GU_URL = `http://k8d102.p.ssafy.io:8088/api/common/address/sigungu/${si}`;
  const GET_DONG_URL = `http://k8d102.p.ssafy.io:8088/api/common/address/dong/${si}/${goon}`;
  const GET_USER_DATA = "http://k8d102.p.ssafy.io:8088/api/user/info";
  const PATCH_USER_DATA = "http://k8d102.p.ssafy.io:8088/api/user/info";

  const getUserDataOptions = {
    headers: { Authorization: `Bearer ${useGetUserToken()}` },
  };

  const getSiData = useApi("get", GET_SI_URL);
  const getGuData = useApi("get", GET_GU_URL);
  const getDongData = useApi("get", GET_DONG_URL);
  const getUserData = useApi("get", GET_USER_DATA, getUserDataOptions);

  useQuery(["getSiData"], getSiData, {
    select: (res) => res.data.message,
    onSuccess: (res) => setSiData(() => res),
    onError: (err) => console.error,
    suspense: false,
  });

  useQuery(["getGuData", si], getGuData, {
    select: (res) => res.data.message,
    onSuccess: (res) => setGuData(() => res),
    onError: (err) => console.error,

    suspense: false,
    enabled: !!si,
  });

  useQuery(["getDongData", goon], getDongData, {
    select: (res) => res.data.message,
    onSuccess: (res) => setDongData(() => res),
    onError: (err) => console.error,

    suspense: false,
    enabled: !!goon,
  });

  const { data } = useQuery("getUserData", getUserData, {
    onError: (err) => console.log(err),
    select: (res) => res.data.message,
    onSuccess: (res) => {
      setNickName(() => res.nickname);
      setAddr(() => res.address);
      if (res.img)
        setCurrentImg(() => `http://k8d102.p.ssafy.io:8088/images/${res.img}`);
      // setSi(() => res.sido);
      // setGoon(() => res.sigungu);
      // setDong(() => res.dong);
    },

    suspense: false,
  });

  // input click 이벤트 발생 및 선택한 사진
  // 초기값
  //   프로필 사진이 등록되었을 경우 : 받아온이미지
  //   없을 경우 : 기본 이미지
  const inputFile = useRef<any>(null);
  const [currentImg, setCurrentImg] = useState<any>(profile);
  const [isChange, setIsChange] = useState<boolean>(false);

  // 사진 버튼 클릭///////
  const handleProfile = () => {
    //div에서 input 선택 click이벤트발생시킴
    inputFile.current.click();
  };
  ////////////////

  ////////// 사진 바뀜 /////////
  const saveImgFile = () => {
    const file = inputFile.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCurrentImg(reader.result);
    };
    setIsChange(() => true);
  };
  //////////

  // 버튼 클릭//////////
  const patchUserData = async () => {
    const formData: any = new FormData();
    formData.append("nickname", nickName);
    formData.append("sido", si);
    formData.append("sigungu", goon);
    formData.append("dong", dong);
    formData.append("address", addr);
    if (isChange) formData.append("imgFile", inputFile?.current?.files[0]);
    else if (!isChange && data?.img) {
      formData.append("img", data?.img);
    }

    // for (let i of formData) {
    //   console.log(i);
    // }

    return fetch(PATCH_USER_DATA, {
      method: "PATCH",
      body: formData,
      ...getUserDataOptions,
    });
  };
  ///////////

  // 닉네임/////
  const handleNickName = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setNickName(e.target.value);
  };
  ///////////

  // 주소////////
  const handleAddr = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setAddr(e.target.value);
  };
  /////////////
  ////////// 클릭 /////////////
  const modifyInfo = () => {
    if (si && goon && dong) {
      patchUserData()
        .then((res) =>
          Alert("success", "회원정보가 수정되었습니다.", navigate("/home"))
        )
        .catch((err) => console.log(err));
    } else {
      Alert("error", "주소를 올바르게 선택해 주세요.");
    }
  };
  ///////////////////
  return (
    <div css={container}>
      <div className="imgSection">
        <div className="imgBox">
          <img src={currentImg} alt="profile" className="profile" />
        </div>
        <div className="iconFrame">
          <div className="cameraIcon" onClick={handleProfile}>
            <AiFillCamera size="22" />
            <input
              onChange={saveImgFile}
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      <div className="nickNameSection">
        <div className="title">닉네임</div>
        <TextField
          id="standard-basic"
          variant="standard"
          fullWidth
          placeholder={data?.nickname}
          onBlur={handleNickName}
        />
      </div>
      <div className="addrSection">
        <div className="title">주소</div>
        <div className="dropDownSection">
          <DropDown content="시/도" setValue={setSi} data={prePro(siData)} />
          <DropDown content="시/군" setValue={setGoon} data={prePro(guData)} />
          <DropDown content="동" setValue={setDong} data={prePro(dongData)} />
        </div>
        <TextField
          id="standard-basic"
          variant="standard"
          fullWidth
          placeholder={data?.address}
          onBlur={handleAddr}
        />
      </div>
      <Btn
        content="수정하기"
        width="80%"
        height="50px"
        backGroundColor="#FFABAB"
        border="0"
        color="white"
        marginTop={15}
        onClick={modifyInfo}
      />
    </div>
  );
}
