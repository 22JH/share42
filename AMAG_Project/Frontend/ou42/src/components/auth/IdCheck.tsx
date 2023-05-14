/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { GoCheck } from "react-icons/go";
import { useQuery } from "react-query";
import { useApi } from "./../../hooks/useApi";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

interface PropType {
  setId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
}

const container = css`
  display: flex;
  height: auto;
  width: 70%;
  flex-direction: column;
  margin-bottom: 10px;
  .idHeader {
    font-size: 1rem;
    margin-bottom: 5px;
  }

  .idSection {
    display: flex;
    height: 100%;
  }
`;

export default function IdCheck({ setId, id }: PropType) {
  const [validId, setValidId] = useState<string>("");
  // 0 : 초기상태, 1 : 통과, 2: 중복검사실패
  const [checkPass, setCheckPass] = useState<number>(0);

  const reg = /^[a-z0-9_]{8,20}$/;
  const URL = `https://www.share42-together.com/api/join/check-id/${validId}`;

  const checkId = useApi("get", URL);

  const { refetch } = useQuery("checkId", checkId, {
    select: (res) => res?.data?.message,
    enabled: false,
    suspense: false,
  });

  const idHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setValidId(() => e?.target?.value);
  };
  useEffect(() => {
    if (reg.test(validId)) {
      refetch().then((res) => {
        if (res.data == true) {
          setCheckPass(1);
          setId(() => validId);
        } else {
          setCheckPass(2);
        }
      });
    } else {
      setCheckPass(0);
    }
  }, [validId]);
  return (
    <div css={container}>
      <div css={{ display: "flex", justifyContent: "space-between" }}>
        <div className="idHeader">ID</div>
        {checkPass == 1 ? <GoCheck color="#ffabab" /> : null}
        {checkPass == 2 ? "중복된 아이디 입니다." : null}
      </div>
      <TextField
        size="small"
        onChange={idHandler}
        placeholder="아이디를 입력해 주세요."
      />
      {checkPass == 0
        ? "소문자, 숫자를 8자 이상 20자 이내 입력해 주세요"
        : null}
    </div>
  );
}
