import { UserShareDetailCarouselProps } from "./type/UserShareDetailType";

const UserShareDetailCarousel = ({
  slideRef,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  slides,
  slideWidth,
  handleDotClick,
  currentSlide,
  data
}: UserShareDetailCarouselProps) => {

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
        {slides.map((slide, idx) => (
          <div key={slide.id} style={{ width: slideWidth }}>
            <img
              src={slide.image}
              alt={`${idx} Slide`}
              style={{ width: slideWidth, height: slideWidth }}
            />
          </div>
        ))}
        {/* 이거 data 받아서 쓰는거 */}
        {/*
          <div style={{ width: slideWidth }}>
            <img
              src={data.img}
              alt={data.img}
              style={{ width: slideWidth, height: slideWidth }}
            />
          </div>
        */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-5vh",
        }}
      >
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
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
        ))}
      </div>
    </>
  );
};

export default UserShareDetailCarousel;
