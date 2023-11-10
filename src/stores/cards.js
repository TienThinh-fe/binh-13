import { create } from 'zustand'

export const useCardStore = create((set) => ({
  chosenCards: [],
  setChosenCards: (chosenCards) => set({ chosenCards }),
}))
