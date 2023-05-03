/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import communityStore from "../../store/communityStore";
import navStore from "../../store/navStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CommunityNavBar() {
  const { pathname } = useLocation();
  const [isClick, setClick] = useState<boolean>(true);
  const { setSearch } = communityStore();
  const navigate = useNavigate();
  const { pathTitle, setPathTitle } = navStore();

  const handleSearchBar = () => {
    setClick(!isClick);
  };

  const handleSearchInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setClick(true);
      setSearch(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (pathname === "/user/community/reg") {
      setPathTitle("게시글 등록하기");
    }
  }, []);

  return (
    <>
      {pathname === '/user/community' ? <div
        style={{
          width: "100vw",
          height: "5vh",
          marginBottom: "1rem",
          display: "flex",
        }}
      >
        {isClick ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: 'flex-end',
              marginRight: '4vw'
            }}
          >
            <BsSearch size={25} onClick={handleSearchBar} />
            <input
              style={{
                marginLeft: "0.5rem",
                height: "1.5rem",
                display: "none",
                width: "0%",
                transition: "all 1s",
              }}
              type="text"
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: 'flex-end',
              marginRight: '4vw'
            }}
          >
            <BsSearch size={25} onClick={handleSearchBar} />
            <input
              style={{
                marginLeft: "0.5rem",
                height: "1.5rem",
                width: "40vw",
                transition: "all 1s",
              }}
              type="text"
              onChange={handleSearchInfo}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
      </div> : null}
      {pathname === '/user/community/reg' ? 
        <div
          style={{
            width: 'calc(100% - 1rem)',
            height: '5vh',
            borderBottom: '1px solid #adadad',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1rem'
          }}
        >
          <MdArrowBackIosNew 
            size={25} 
            onClick={() => navigate(-1)} 
            style={{
              marginRight: '1rem'
            }}
          />
          <span
            style={{
              width: '75%',
              textAlign: 'center',
              fontWeight: '900'
            }}
          >{pathTitle}</span>
        </div>
        : null
      }
      <Outlet />
    </>
  );
}

export default CommunityNavBar;
