import { create } from "zustand";

type WinnderDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isEnd: boolean;
  onEnd: () => void;
  winner: string;
  onWinnerO: () => void;
  onWinnerX: () => void;
  onDraw: () => void;
};

const useWinnderDialog = create<WinnderDialogStore>((set) => ({
  isOpen: true,
  isEnd: false,
  winner: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onEnd: () => set({ isEnd: true }),
  onWinnerO: () => set({ winner: "O" }),
  onWinnerX: () => set({ winner: "X" }),
  onDraw: () => set({ winner: "draw" }),
}));

export default useWinnderDialog;
