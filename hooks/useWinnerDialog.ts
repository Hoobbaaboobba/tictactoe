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
  prise: number;
  minus: number;
};

const prise = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const randomPrise: number = parseInt(prise(24, 34).toFixed(0), 10);
const randomMinus: number = parseInt(prise(8, 15).toFixed(0), 10);

const useWinnderDialog = create<WinnderDialogStore>((set) => ({
  isOpen: true,
  isEnd: false,
  winner: "",
  prise: randomPrise,
  minus: randomMinus,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onEnd: () => set({ isEnd: true }),
  onWinnerO: () => set({ winner: "O" }),
  onWinnerX: () => set({ winner: "X" }),
  onDraw: () => set({ winner: "draw" }),
}));

export default useWinnderDialog;
