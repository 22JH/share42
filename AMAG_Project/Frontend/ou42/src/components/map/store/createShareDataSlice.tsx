import { StateCreator } from "zustand";

export interface createShareDataSliceType {
  shareData: null | FormData;
  setShareData: (shareData:null | FormData) => void;
}

export const createShareDataSlice: StateCreator<
  createShareDataSliceType
> = (set) => ({
  shareData: null,
  setShareData: (shareData:null | FormData) => set({shareData}),
});