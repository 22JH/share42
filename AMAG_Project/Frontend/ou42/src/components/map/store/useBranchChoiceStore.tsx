import { create } from "zustand";

export interface useBranchChoiceStoreType {
  branchChoice: { name: string; id: string | null };
  setBranchChoice: (branchChoice: { name: string; id: string | null }) => void;
}

export const useBranchChoiceStore = create<useBranchChoiceStoreType>((set) => ({
  branchChoice: { name: "", id: null },
  setBranchChoice: (branchChoice: { name: string; id: string | null }) =>
    set({ branchChoice }),
}));
