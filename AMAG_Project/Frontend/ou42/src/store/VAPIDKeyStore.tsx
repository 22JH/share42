import { create } from "zustand";

interface Key {
  VAPID: string;
  setVAPID: (VAPID: string) => void;
}

const VAPIDKeyStore = create<Key>((set) => ({
  VAPID: "",
  setVAPID: (VAPID) => {
    set(() => ({ VAPID: VAPID }));
  },
}));

export default VAPIDKeyStore;
