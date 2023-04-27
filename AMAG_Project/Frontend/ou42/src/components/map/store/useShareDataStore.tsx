import { create } from 'zustand';

export interface useShareDataStoreType{
  shareData: null | FormData;
  setShareData: (shareData:null | FormData) => void;
}

export const useShareDataStore = create<useShareDataStoreType>((set) => ({
  shareData: null,
  setShareData: (shareData:null | FormData) => set({shareData}),
}))