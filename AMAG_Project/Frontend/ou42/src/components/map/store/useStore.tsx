import { create } from 'zustand';

export interface useStoreType{
  branchChoice: string,
  setBranchChoice: (name: string) => void;
  isOpenMap: null | boolean,
  setIsOpenMap: (bool: boolean) => void;
  title: string,
  setTitle: (title:string) => void;
  price: string,
  setPrice: (price:string) => void;
  category: string,
  setCategory: (category:string) => void;
  content: string;
  setContent: (content:string) => void;
  preview: File | null;
  setPreview: (preview:File | null) => void;
  shareData: null | FormData;
  setShareData: (shareData:null | FormData) => void;
}

export const useStore = create<useStoreType>((set) => ({
  branchChoice: '',
  setBranchChoice: (name) => set({ branchChoice: name}),
  isOpenMap: null,
  setIsOpenMap: (bool) => set({ isOpenMap: bool}),
  title: '',
  setTitle: (title) => set({ title }),
  price: '',
  setPrice: (price:string) => set({ price }),
  category: '',
  setCategory: (category:string) => set({category}),
  content: '',
  setContent: (content:string) => set({content}),
  preview: null,
  setPreview: (preview:File | null) => set({preview}),
  shareData: null,
  setShareData: (shareData:null | FormData) => set({shareData}),
}))