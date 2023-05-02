/** @jsxImportSource @emotion/react */

import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import communityStore from "../../store/communityStore";
import navStore from "../../store/navStore";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CommunityNavBar() {
  const { pathname } = useLocation();
  const [ isClick, setClick ] = useState<boolean>(true);
  const { setSearch } = communityStore();
  const navigate = useNavigate();
  const { pathTitle, setPathTitle } = navStore();

  const handleSearchBar = () => {
    setClick(!isClick);
  };

  // const handleSearchInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setClick(true);
      setSearch(e.currentTarget.value);
    }
  };
  
  useEffect(() => {
    if (pathname === "/user/community/reg") {
      setPathTitle("게시글 등록하기")
    }
  }, [])

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "5vh",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {pathname === "/user/community" ? (
          <div>
            {isClick ? (
              <div
                style={{
                  width: "10vw",
                  height: "100%",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                <BsSearch
                  size={25}
                  onClick={handleSearchBar}
                />
                <input 
                style={{
                  marginLeft: '0.5rem',
                  height: '1.5rem',
                  display: 'none',
                  width: '0%',
                  transition: 'all 1s'
                }}
                type="text" />
              </div>
            ) : (
              <div
              style={{
                width: "57vw",
                  height: "100%",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                >
                <BsSearch size={25} onClick={handleSearchBar} />
                <input 
                  style={{
                    marginLeft: '0.5rem',
                    height: '1.5rem',
                    width: '40vw',
                    transition: 'all 1s'
                  }}
                  type="text"
                  // onChange={handleSearchInfo}
                  onKeyDown={handleKeyDown} 
                />
              </div>
            )}
          </div>
        ) : 
        <div 
          style={{
            borderBottom: '1px solid black',
            width: '100vw',
            height: "5vh",
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
            lineHeight: '5vh'
          }}
          className="left-icon"
        >
          <div
            style={{
              margin: '1rem 1rem'
            }}
          >
            <MdArrowBackIosNew 
              style={{
                marginTop: '1rem'
              }}
              size={20} 
              onClick={() => navigate(-1)} 
            />
          </div>
          <div
          >{pathTitle}</div>
        </div>
        }
      </div>
      <Outlet />
    </>
  );
}

export default CommunityNavBar;
