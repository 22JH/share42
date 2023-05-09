/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Outlet, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import navStore from "../../store/navStore";
import { useEffect, useState } from "react";
import shareIsOpenStore from "../../store/shareIsOpenStore";
import { useBranchChoiceStore } from "../map/store/useBranchChoiceStore";
import { FaEllipsisV } from "react-icons/fa";

const nav = css`
  .left-icon {
    width: 100%;
    height: 6vh;
    display: flex;
    align-items: center;
    p {
      font-size: 1.25rem;
      font-weight: 900;
      margin-left: 2%;
    }
  }
  div {
    color: black;
  }
  div:nth-of-type(1) {
    margin-left: 3%;
  }

  div:nth-of-type(2) {
    margin-right: 3%;
  }
`;

function SharePageNavBar() {
  const { pathTitle, setPathTitle } = navStore();
  const { isOpenShareMap, setIsOpenShareMap } = shareIsOpenStore();
  const { setBranchChoice } = useBranchChoiceStore();
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState<string>("");
  const [svgColor, setSvgColor] = useState<string>("");

  const handleNavigate = () => {
    if (isOpenShareMap) {
      setIsOpenShareMap(false);
    } else if (isOpenShareMap === false) {
      setBranchChoice({ name: "", id: null });
      navigate(-1);
    }
  };

  useEffect(() => {
    if (pathname === "/user/share-reg") {
      setPathTitle("공유 물품 등록하기");
      setBgColor("white");
      setSvgColor("#000000")
    } else if (pathname === "/user/share-category") {
      setPathTitle("카테고리 선택하기");
      setBgColor("white");
      setSvgColor("#000000")
    } else if (pathname === `/user/share-post/${id}`) {
      setBgColor("rgba(0,0,0,0)");
      setSvgColor("#ffffff")
    }
    console.log(pathname);
  }, [pathname, id, setPathTitle]);

  return (
    <>
      {pathname === `/user/share-reg` ||
      pathname === `/user/share-category` ||
      pathname === `/user/share-post/${id}` ? (
        <div
          css={nav}
          style={{
            position: 'absolute',
            width: '100%',
            display: 'flex',
            justifyContent: "space-between",
            backgroundColor: `${bgColor}`,
            alignItems: "center",
          }}
        >
          <div className="left-icon">
            <MdArrowBackIosNew 
              size={25} 
              onClick={handleNavigate}
              style={{
                color: `${svgColor}`
              }}
            />
            <p>{pathTitle}</p>
          </div>
          <FaEllipsisV
            size={25}
            style={{
              marginRight: "1rem",
              color: `${svgColor}`
            }}
            onClick={() => navigate("/user/report")}
          />
        </div>
      ) : null}
      <Outlet />
    </>
  );
}

export default SharePageNavBar;
