import { useEffect, useState } from "react";
import { UserShareDetailCarouselProps } from "./type/UserShareDetailType";

const UserShareDetailCarousel = ({
  slideRef,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  slideWidth,
  handleDotClick,
  currentSlide,
  data,
  keepImg,
  returnImg,
}: UserShareDetailCarouselProps) => {
  const [carouselImg, setCarouselImg] = useState<any[]>([]);
  const lst:any[] = [];

  useEffect(() => {
    if (data?.article.img) {
      lst.push(`${process.env.REACT_APP_IMAGE_URL}${data?.article.img}`);
    }
  }, [data])

  useEffect(() => {
    if (data) {
      if (data?.keepImg === null || data?.keepImg === undefined) {
      }
      else {
        lst.push(`${process.env.REACT_APP_IMAGE_URL}${data?.keepImg}`);
      } 
      if (data?.returnImg.length > 0) {
        for (let i = 0; i < data?.returnImg.length; i++) {
          if (data?.returnImg[i] !== null) {
            lst.push(
              `${process.env.REACT_APP_IMAGE_URL}${data?.returnImg[i]}`
            );
          }
        }
      }
      setCarouselImg(lst);
    }
  }, [data]);

  return (
    <>
      <div
        ref={slideRef}
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {carouselImg
          ? carouselImg?.map((slide, idx) => (
              <div key={idx} style={{ width: slideWidth }}>
                <img
                  src={slide}
                  alt={`${idx} Slide`}
                  style={{ width: slideWidth, height: slideWidth }}
                />
              </div>
            ))
          : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-5vh",
        }}
      >
        {carouselImg
          ? carouselImg?.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                style={{
                  padding: "0",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: 5,
                  backgroundColor: currentSlide === idx ? "lightGray" : "white",
                }}
              ></button>
            ))
          : null}
      </div>
    </>
  );
};

export default UserShareDetailCarousel;
