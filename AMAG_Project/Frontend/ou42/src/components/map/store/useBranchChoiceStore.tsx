import { create } from 'zustand';

export interface useBranchChoiceStoreType{
  branchChoice: string,
  setBranchChoice: (name: string) => void;
}

export const useBranchChoiceStore = create<useBranchChoiceStoreType>((set) => ({
  branchChoice: '',
  setBranchChoice: (name) => set({ branchChoice: name}),
}))