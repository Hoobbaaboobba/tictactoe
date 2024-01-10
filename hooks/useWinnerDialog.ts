import { create } from "zustand";

type WinnderDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isEnd: boolean;
  onEnd: () => void;
  resetEnd: () => void;
  winner: string;
  onWinnerO: () => void;
  onWinnerX: () => void;
  onDraw: () => void;
  resetWinner: () => void;
};

const useWinnderDialog = create<WinnderDialogStore>((set) => ({
  isOpen: true,
  isEnd: false,
  winner: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onEnd: () => set({ isEnd: true }),
  resetEnd: () => set({ isEnd: false }),
  onWinnerO: () => set({ winner: "O" }),
  onWinnerX: () => set({ winner: "X" }),
  onDraw: () => set({ winner: "draw" }),
  resetWinner: () => set({ winner: "" }),
}));

export default useWinnderDialog;
