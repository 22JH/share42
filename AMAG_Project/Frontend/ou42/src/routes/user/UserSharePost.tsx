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
import { useNavigate } from "react-router-dom";

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
  const [useRequest, setUseRequest] = useState<null | boolean>(true);
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

  // 좋아요에 따라서 색 바꾸기 및 API 요청
  const handleLikeRequest = () => {
    setIsLike(!isLike);
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
    navigate("/")
  }

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
        <div
          style={{
            width: "85vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2vh",
            marginBottom: "2vh",
            fontWeight: "900",
          }}
        >
          {/* NFC버튼, 사용하기, 채팅하기, 가격, 동네 가져오기 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* toLocaleString() */}
            <span>{`200원`}</span>
            <span
              style={{
                color: "#adadad",
                fontWeight: "500",
              }}
            >
              구미 인동
            </span>
          </div>
          <div>
            {useRequest ? (
              <button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#FFABAB",
                  border: "none",
                  borderRadius: "5px",
                  boxShadow: "2px 2px 5px #00000051",
                  padding: "1.4vh 4vw",
                }}
                onClick={handleUseRequest}
              >
                사용신청
              </button>
            ) : (
              <>
                <button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#909090",
                    border: "none",
                    borderRadius: "5px",
                    boxShadow: "2px 2px 5px #00000051",
                    padding: "1.4vh 4vw",
                  }}
                  onClick={handleUseCancel}
                >
                  사용취소
                </button>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '5vh',
                    right: '8vw',
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '50%',
                    textAlign: 'center',
                    lineHeight: '5rem',
                    backgroundColor: 'red',
                    color: 'white',
                    fontWeight: '900'
                  }}
                  onClick={handleNFC}
                >
                  NFC
                </div>
              </>
            )}
            <button
              style={{
                marginLeft: "3vw",
                color: "#ffffff",
                backgroundColor: "#FFABAB",
                border: "none",
                borderRadius: "5px",
                boxShadow: "2px 2px 5px #00000051",
                padding: "1.4vh 4vw",
              }}
              onClick={handleChating}
            >
              채팅하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSharePost;
