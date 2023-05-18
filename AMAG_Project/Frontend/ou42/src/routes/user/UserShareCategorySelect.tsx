/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CategoryDiv = css`
  &:nth-of-type(odd) {
    margin-right: 7vw;
    margin-left: 7vw;
  }

  &:nth-of-type(7),
  &:nth-of-type(8) {
    margin-bottom: 3vh;
  }
`;

const UserShareCategorySelect = () => {
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const [options, setOptions] = useState<any[]>([]);

  const navigate = useNavigate();

  // 로딩되는 순간 카테고리 받아와야 함
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://www.share42-together.com/api/common/category",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setOptions(res.data.message);
      })
      .catch();
  }, []);

  const handleCategorySelector = (category: string) => {
    navigate("/user/share-reg", {
      state: {
        category,
      },
    });
  };

  return (
    <>
      <div
        style={{
          height: "6vh",
        }}
      ></div>
      <h2
        style={{
          marginTop: "5vh",
          marginBottom: "5vh",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        공유하실 물품의 종류를 선택해주세요
      </h2>
      <div
        css={{ CategoryDiv }}
        style={{
          margin: "3vh",
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "#fcc8d181",
          borderRadius: "12px",
        }}
      >
        {options.map((item, index) => (
          <div
            key={index}
            css={CategoryDiv}
            style={{
              marginTop: "3vh",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              width: "32vw",
              height: "19.3vh",
              fontSize: "1.5rem",
              fontWeight: "900",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              boxShadow: "3px 3px 0px #8f8f8f50",
            }}
            onClick={() => handleCategorySelector(item.category)}
          >
            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}
            ></div>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${item.img}`}
              alt={`${item.img}`}
            />
            <span
              style={{
                fontSize: "1.2rem",
              }}
            >
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserShareCategorySelect;
