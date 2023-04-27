import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BranchChoiceState {
  branchChoice: string
  setBranchChoice: (by: string) => void
}

export const useBranchChoiceStore = create<BranchChoiceState>()(
  devtools(
    persist((set) => ({
      branchChoice: '',
      setBranchChoice: (by) => set((state) => ({ branchChoice: state.branchChoice + by})),
    }))
  )
)


// import { StateCreator } from "zustand";

// export interface createBranchChoiceSliceType {
//   branchChoice: string;
//   setBranchChoice: (name: string) => void;
// }

// export const createBranchChoiceSlice: StateCreator<
//   createBranchChoiceSliceType
// > = (set) => ({
//   branchChoice: '',
//   setBranchChoice: (name: string) => set({ branchChoice: name })
// });