/* eslint-disable max-len */
/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import driver1 from "../../assets/testObject.jpg";
import driver2 from "../../assets/driver1.jpg";
import driver3 from "../../assets/driver2.jpg";
import driver4 from "../../assets/driver3.jpg";

import UserShareDetailCarousel from "../../components/sharedetail/UserShareDetailCarousel";
import UserShareDetailPostInfo from "../../components/sharedetail/UserShareDetailPostInfo";
import UserShareDetailContent from "../../components/sharedetail/UserShareDetailContent";
import UserShareDetailRequest from "../../components/sharedetail/UserShareDetailRequest";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

const SHARE_DETAIL_API = (id: any) => {
  // eslint-disable-next-line max-len
  return `http://www.share42-together.com:8088/api/user/share/share-articles/${id}`;
};

const UserSharePost = () => {
  const { id } = useParams();
  const loginObject = localStorage.getItem("loginInfo");
  const { token } = loginObject ? JSON.parse(loginObject) : null;

  const slideWidth = 415;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentTouchStart, setCurrentTouchStart] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isLike, setIsLike] = useState<null | boolean>(null);
  const [useRequest, setUseRequest] = useState<null | boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(0);
  const navigate = useNavigate();

  const slides = [
    { id: 0, image: driver1 },
    { id: 1, image: driver2 },
    { id: 2, image: driver3 },
    { id: 3, image: driver4 },
  ];

  // 점 클릭하면 넘어가게 일단 기능 구현
  const handleDotClick = (idx: number) => {
    if (slideRef.current) {
      slideRef.current.scrollTo({
        left: slideWidth * idx,
        behavior: "smooth",
      });
      setCurrentSlide(idx);
    }
  };

  // 슬라이드 손가락 누른부분을 시작점으로
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    setCurrentTouchStart(touchStartX);
  };

  // 누른 상태로 이동하여 거리 계산
  const handleTouchMove = (e: React.TouchEvent) => {
    if (slideRef.current) {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchMoveX - currentTouchStart;
      setSlideOffset(deltaX);
    }
  };

  // 손가락을 떼로 난 다음거리 계산해서 이미지 조정하기
  const handleTouchEnd = () => {
    const slideOffsetAbs = Math.abs(slideOffset);

    if (slideOffsetAbs > slideWidth / 4) {
      const direction = slideOffset > 0 ? "right" : "left";
      const nextSlideIndex =
        direction === "right" ? currentSlide - 1 : currentSlide + 1;

      scrollToSlide(nextSlideIndex);
      setCurrentSlide(nextSlideIndex);
    } else {
      scrollToSlide(currentSlide);
    }

    setSlideOffset(0);
  };

  // 슬라이드 전체 위치를 왼쪽 오른쪽으로
  const scrollToSlide = (idx: number) => {
    if (slideRef.current) {
      slideRef.current.scrollTo({
        left: slideWidth * idx,
        behavior: "smooth",
      });
      setCurrentSlide(idx);
    }
  };

  // 찜하기
  const handleLikeRequest = () => {
    setIsLike(!isLike);
  };

  // 찜취소
  const handleLikeCancel = () => {
    setIsLike(!isLike);
    console.log(id)
  };

  // 사용신청 하기
  const handleUseRequest = () => {
    setUseRequest(false);
    // useQuery 또는 api 요청
  };

  // 사용취소 하기
  const handleUseCancel = () => {
    setUseRequest(true);
    // useQuery 또는 api 요청
  };

  // 채팅하기 화면으로
  const handleChating = () => {
    // 채팅화면으로 가기
    navigate("/user/chat/userId");
  };

  // NFC 화면으로
  const handleNFC = () => {
    // NFC 화면으로 가기
    navigate("/");
  };

  // 상세조회 페이지 데이터 가져오기
  const { data } = useQuery(
    ['getShareDetail', id],
    async () => {
      try {
        const res = await axios({
          method: "GET",
          url: SHARE_DETAIL_API(id),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setLikeCount(res.data.message.likeCount);
        return res.data.message.article;
      } catch (e) {
        console.log(e);
      }
    },
    {
      suspense: false,
    }
  )

  return (
    <>
      <UserShareDetailCarousel
        slideRef={slideRef}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
        slides={slides}
        slideWidth={slideWidth}
        handleDotClick={handleDotClick}
        currentSlide={currentSlide}
        data={data}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2.5vh",
        }}
      >
        <UserShareDetailPostInfo
          handleLikeRequest={handleLikeRequest}
          handleLikeCancel={handleLikeCancel}
          isLike={isLike}
          data={data}
        />
        <UserShareDetailContent data={data} likeCount={likeCount}/>
        <UserShareDetailRequest
          useRequest={useRequest}
          handleUseRequest={handleUseRequest}
          handleUseCancel={handleUseCancel}
          handleNFC={handleNFC}
          handleChating={handleChating}
          data={data}
        />
      </div>
    </>
  );
};

export default UserSharePost;
