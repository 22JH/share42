import { create } from "zustand";

interface Nav {
  pathTitle: string;
  setPathTitle: (pathTitle: string) => void;
}

const navStore = create<Nav>((set) => ({
  pathTitle: "",
  setPathTitle: (pathTitle) => {
    set(() => ({ pathTitle: pathTitle }));
  },
}));

export default navStore;
