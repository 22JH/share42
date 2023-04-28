/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Btn from "../../components/UI/Btn";
import logo from "../../assets/logo.png";
import { useQuery, useQueryErrorResetBoundary } from "react-query";
import { useApi } from "./../../hooks/useApi";

const URL = "http://k8d102.p.ssafy.io:8088/api/common/terms/join";

const container = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    width: auto;
    height: 240px;
  }
  .header {
    font-size: 3.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .section {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-bottom: 20px;
    .termsSection {
      display: flex;
      flex-direction: row;
      .checkIcon {
        margin-right: 5px;
      }
      .temrs {
        font-size: 1rem;
        margin-bottom: 10px;
      }
    }

    .termsDetail {
      height: 90px;
      border: 1px solid black;
      margin-bottom: 20px;
      overflow: scroll;
      padding: 5px 5px 5px 5px;
    }
  }

  .btnSection {
    display: flex;
    width: 70%;
    height: 5%;
  }
`;

const AGREE_ALL: string =
  "이용약관, 개인정보 수집 및 이용, 위치기반서비스 이용약관(모두동의)";

const AGREE_1: string = "이용약관 동의(필수)";
const AGREE_2: string = "개인정보 수집 및 이용 동의(필수)";
const AGREE_3: string = "위치기반서비스 이용약관 동의(선택)";

const AGREE_DETAIL_1: string =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consequuntur autem, ullam quam error debitis, vero maiores voluptatibus quibusdam expedita earum inventore explicabo reprehenderit voluptatem provident nihil. Sed, impedit esse.";

export default function Temrs() {
  const [agreeBtnAll, setAgreeBtnAll] = useState(false);
  const [agreeBtn1, setAgreeBtn1] = useState(false);
  const [agreeBtn2, setAgreeBtn2] = useState(false);
  const [agreeBtn3, setAgreeBtn3] = useState(false);

  const navigate = useNavigate();
  const getTerms = useApi("get", URL);

  const { data } = useQuery("getTerms", getTerms, {
    staleTime: 500 * 1000,
    select: (res) => res?.data?.message,
    suspense: false,
  });

  const checkAvailable = () => {
    if (agreeBtn1 && agreeBtn2) {
      return navigate("/");
    } else {
      return alert("체크");
    }
  };

  const handleAgreeBtnAll = () => {
    if (!agreeBtnAll) {
      setAgreeBtnAll(true);
      setAgreeBtn1(true);
      setAgreeBtn2(true);
      setAgreeBtn3(true);
    } else {
      setAgreeBtnAll(false);
      setAgreeBtn1(false);
      setAgreeBtn2(false);
      setAgreeBtn3(false);
    }
  };
  return (
    <div css={container}>
      <div className="logo">
        <img src={logo} alt="logo" height="250" width="250" />
      </div>
      <div className="section">
        <div className="termsSection" onClick={handleAgreeBtnAll}>
          <div className="checkIcon">
            <AiOutlineCheckCircle
              size={"25px"}
              css={{
                marginRight: "5px",
                fill: `${agreeBtnAll ? "blue " : "black"}`,
              }}
            />
          </div>
          <div className="temrs">{AGREE_ALL}</div>
        </div>
      </div>
      <div className="section">
        <div
          className="termsSection"
          onClick={() => setAgreeBtn1((prev) => !prev)}
        >
          <div className="checkIcon">
            <AiOutlineCheckCircle
              size={"25px"}
              css={{
                marginRight: "5px",
                fill: `${agreeBtn1 ? "blue " : "black"}`,
              }}
            />
          </div>
          <div className="temrs">{AGREE_1}</div>
        </div>
        <div className="termsDetail">
          <p>{data[0].content}</p>
        </div>
      </div>
      <div className="section">
        <div
          className="termsSection"
          onClick={() => setAgreeBtn2((prev) => !prev)}
        >
          <div className="checkIcon">
            <AiOutlineCheckCircle
              size={"25px"}
              css={{
                marginRight: "5px",
                fill: `${agreeBtn2 ? "blue " : "black"}`,
              }}
            />
          </div>
          <div className="temrs">{AGREE_2}</div>
        </div>
        <div className="termsDetail">
          <p>{data[1].content}</p>
        </div>
      </div>
      <div className="section">
        <div
          className="termsSection"
          onClick={() => setAgreeBtn3((prev) => !prev)}
        >
          <div className="checkIcon">
            <AiOutlineCheckCircle
              size={"25px"}
              css={{
                marginRight: "5px",
                fill: `${agreeBtn3 ? "blue " : "black"}`,
              }}
            />
          </div>
          <div className="temrs">{AGREE_3}</div>
        </div>
        <div className="termsDetail">
          <p>{AGREE_DETAIL_1}</p>
        </div>
      </div>
      <div className="btnSection">
        <Btn
          width={"45%"}
          height={"100%"}
          backGroundColor={"white"}
          content={"취소"}
          marginRight={20}
          onClick={() => navigate("/")}
        />
        <Btn
          width={"45%"}
          height={"100%"}
          backGroundColor={"white"}
          content={"확인"}
          onClick={checkAvailable}
        />
      </div>
    </div>
  );
}
