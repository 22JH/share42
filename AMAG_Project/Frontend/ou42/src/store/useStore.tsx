import { create } from "zustand";
import { devtools } from "zustand/middleware";
// export type MyState = CounterSlice & FishSlice;

const init: any = {};

const useStore = create(devtools(init));

export default useStore;
