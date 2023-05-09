import { create } from "zustand";

interface Nav {
  category: number;
  setCategory: (category: number) => void;
}

const adminStore = create<Nav>((set) => ({
  category: 2,
  setCategory: (category) => {
    set(() => ({ category: category }));
  },
}));

export default adminStore;
