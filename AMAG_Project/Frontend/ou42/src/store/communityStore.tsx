import { create } from "zustand";

interface Community {
  search: string;
  setSearch: (search: string) => void;
}

const communityStore = create<Community>((set) => ({
  search: "",
  setSearch: (search) => {
    set(() => ({ search: search }));
  },
}));

export default communityStore;
