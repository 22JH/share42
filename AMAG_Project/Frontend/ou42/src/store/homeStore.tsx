import { create } from "zustand";

interface Search {
  search: string;
  setSearch: (search: string) => void;
}

export const homeStore = create<Search>((set) => ({
  search: "",
  setSearch: (search) => {
    set(() => ({ search: search }));
  },
}));

export default homeStore;
