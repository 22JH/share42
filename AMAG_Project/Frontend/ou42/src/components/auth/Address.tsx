/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextField from "@mui/material/TextField";
import DropDown from "../UI/DropDown";
import { useApi } from "../../hooks/useApi";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

interface PropType {
  setSi: React.Dispatch<React.SetStateAction<string>>;
  setGoon: React.Dispatch<React.SetStateAction<string>>;
  setDong: React.Dispatch<React.SetStateAction<string>>;
  setAddrDetail: React.Dispatch<React.SetStateAction<string>>;
  si: string;
  goon: string;
}

const container = css`
  display: flex;
  height: auto;
  width: 70%;
  flex-direction: column;

  .addrHeader {
    margin-bottom: 10px;
  }

  .selectAddr {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
  }
`;

export const prePro = (data: any) => {
  const temp = data.reduce((pre: any, ele: any) => {
    return [...pre, Object.values(ele)[0]];
  }, []);
  return temp;
};

export default function Address({
  setSi,
  setGoon,
  setDong,
  setAddrDetail,
  si,
  goon,
}: PropType) {
  const [siData, setSiData] = useState<string[]>([]);
  const [guData, setGuData] = useState<string[]>([]);
  const [dongData, setDongData] = useState<string[]>([]);

  interface QueryReturnType {
    data?: any;
    refetch: () => void;
  }
  const GET_SI_URL = `https://www.share42-together.com/api/common/address/sido`;
  const GET_GU_URL = `https://www.share42-together.com/api/common/address/sigungu/${si}`;
  const GET_DONG_URL = `https://www.share42-together.com/api/common/address/dong/${si}/${goon}`;
  const getSiData = useApi("get", GET_SI_URL);
  const getGuData = useApi("get", GET_GU_URL);
  const getDongData = useApi("get", GET_DONG_URL);

  const getSi: QueryReturnType = useQuery("getSiData", getSiData, {
    cacheTime: 500 * 1000,
    staleTime: 500 * 1000,
    select: (res) => prePro(res?.data?.message),
    suspense: false,
  });

  const getGu: QueryReturnType = useQuery("getGuData", getGuData, {
    cacheTime: 500 * 1000,
    staleTime: 500 * 1000,
    select: (res) => prePro(res?.data?.message),
    suspense: false,
  });

  const getDong: QueryReturnType = useQuery("getDongData", getDongData, {
    cacheTime: 500 * 1000,
    staleTime: 500 * 1000,
    select: (res) => prePro(res?.data?.message),
    suspense: false,
  });

  useEffect(() => {
    setSiData(() => getSi?.data);
  }, [getSi.data]);

  useEffect(() => {
    getGu.refetch();
  }, [si]);

  useEffect(() => {
    setGuData(() => getGu.data);
  }, [getGu]);

  useEffect(() => {
    getDong.refetch();
  }, [goon]);

  useEffect(() => {
    setDongData(() => getDong.data);
  }, [getDong]);

  const addrHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setAddrDetail(() => e.target.value);
  };

  return (
    <div css={container}>
      <div className="addrHeader">Address</div>
      <div className="selectAddr">
        <DropDown data={siData} content={"시/도"} setValue={setSi} width={90} />
        <DropDown
          data={guData}
          content={"시/군"}
          setValue={setGoon}
          width={90}
        />
        <DropDown
          data={dongData}
          content={"동"}
          setValue={setDong}
          width={90}
        />
      </div>
      <TextField
        size="small"
        placeholder="자세한 주소를 입력해 주세요"
        onBlur={addrHandler}
      />
    </div>
  );
}
