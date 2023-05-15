export interface UserShareDetailCarouselProps {
  slideRef: React.RefObject<HTMLDivElement>;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  slideWidth: number;
  handleDotClick: (idx: number) => void;
  currentSlide: number;
  data: any;
  keepImg: undefined | string;
  returnImg: any[]
}

export interface UserShareDetailPostInfoProps {
  isLike: null | boolean;
  data: any;
  setIsLike: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserShareDetailRequestProps {
  useRequest: null | boolean;
  handleUseRequest: (id: string | undefined) => void;
  handleUseCancel: (id: string | undefined) => void;
  handleNFC: () => void;
  handleChating: () => void;
  data: any;
  billing: string;
}

export interface UserShareDetailContentProps {
  data: any;
  likeCount: number;
}