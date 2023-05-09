import { create } from "zustand";

interface ShareOpenType {
  isOpenShareMap: boolean;
  setIsOpenShareMap: (isOpenShareMap: boolean) => void;
}

const shareIsOpenStore = create<ShareOpenType>((set) => ({
  isOpenShareMap: false,
  setIsOpenShareMap: (isOpenShareMap) => {
    set(() => ({ isOpenShareMap }));
  },
}));

export default shareIsOpenStore;