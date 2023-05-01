export interface UserShareDetailCarouselProps {
  slideRef: React.RefObject<HTMLDivElement>;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  slides: {
    id: number;
    image: string;
  }[];
  slideWidth: number;
  handleDotClick: (idx: number) => void;
  currentSlide: number;
}


export interface UserShareDetailPostInfoProps {
  isLike: null | boolean;
  handleLikeRequest: () => void;
}

export interface UserShareDetailRequestProps {
  useRequest: null | boolean;
  handleUseRequest: () => void;
  handleUseCancel: () => void;
  handleNFC: () => void;
  handleChating: () => void;
}