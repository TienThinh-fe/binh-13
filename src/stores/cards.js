import { create } from 'zustand'
import { shuffleCards } from '../utils'

export const useCardStore = create((set) => ({
  myCards: shuffleCards(),
  setMyCards: (myCards) => set({ myCards }),

  chosenCards: {
    first: [],
    second: [],
    third: [],
  },
  setChosenCards: (chosenCards) => set({ chosenCards }),
}))
