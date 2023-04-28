/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

import { useRef, useState } from "react";
import driver1 from "../../assets/testObject.jpg";
import driver2 from "../../assets/driver1.jpg";
import driver3 from "../../assets/driver2.jpg";
import driver4 from "../../assets/driver3.jpg";

import UserShareDetailCarousel from "../../components/sharedetail/UserShareDetailCarousel";
import UserShareDetailPostInfo from "../../components/sharedetail/UserShareDetailPostInfo";
import UserShareDetailContent from "../../components/sharedetail/UserShareDetailContent";

export const pulse = keyframes`
  30% {
    transform: scale(1.5);
  }
  60% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
`;

export const FaHeartStyle = css`
  transition: color 0.5s ease, transform 0.5s ease;

  &.like {
    color: red;
    animation: ${pulse} 0.5s ease;
  }
`;

const UserSharePost = () => {
  const slideWidth = 415;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [currentTouchStart, setCurrentTouchStart] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isLike, setIsLike] = useState<null | boolean>(null);

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
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchStartX = e.touches[0].clientX;
    setCurrentTouchStart(touchStartX);
  };

  // 누른 상태로 이동하여 거리 계산
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchMoveX = e.touches[0].clientX;
    const deltaX = touchMoveX - currentTouchStart;
    setSlideOffset(deltaX);
    e.preventDefault();
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

  // 좋아요에 따라서 색 바꾸기 및 API 요청
  const handleLikeRequest = () => {
    setIsLike(!isLike);
  };

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
          isLike={isLike}
        />
        <UserShareDetailContent />
        <div>
          {/* NFC버튼, 사용하기, 채팅하기, 가격, 동네 가져오기 */}
        </div>
      </div>
    </>
  );
};

export default UserSharePost;
