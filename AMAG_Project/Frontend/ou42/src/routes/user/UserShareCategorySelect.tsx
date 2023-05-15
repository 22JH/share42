/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryDiv = css`
  &:nth-of-type(odd) {
    margin-right: 8vw;
  }

  &:nth-of-type(7),
  &:nth-of-type(8) {
    margin-bottom: "0vh";
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
      .catch((error) => console.log(error));
  }, []);

  const handleCategorySelector = (category: string) => {
    navigate("/user/share-reg", {
      state: category,
    });
  };

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <>
      <div
        style={{
          height: "6vh",
        }}
      ></div>
      <div
        css={{ CategoryDiv }}
        style={{
          margin: "3vh",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {options.map((item, index) => (
          <div
            key={index}
            css={CategoryDiv}
            style={{
              marginBottom: "2vh",
              backgroundColor: "#FFABAB",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              width: "39.3vw",
              height: "19.3vh",
              lineHeight: "19.3vh",
              fontSize: "1.5rem",
              fontWeight: "900",
            }}
            onClick={() => handleCategorySelector(item.category)}
          >
            <span
              style={{
                whiteSpace: "nowrap",
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
