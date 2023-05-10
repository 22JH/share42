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
  data: any;
}


export interface UserShareDetailPostInfoProps {
  isLike: null | boolean;
  handleLikeRequest: () => void;
  handleLikeCancel: () => void;
  data: any;
}

export interface UserShareDetailRequestProps {
  useRequest: null | boolean;
  handleUseRequest: () => void;
  handleUseCancel: () => void;
  handleNFC: () => void;
  handleChating: () => void;
  data: any;
}

export interface UserShareDetailContentProps {
  data: any;
  likeCount: number;
}