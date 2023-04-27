import { create } from "zustand";

interface Nav {
  pathName: string;
  setIsChange: (pathName: string) => void;
}

const navStore = create<Nav>((set) => ({
  pathName: "",
  setIsChange: (pathName) => set((state) => ({ pathName: state.pathName })),
}));

export default navStore;
