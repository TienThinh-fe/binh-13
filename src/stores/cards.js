import { create } from 'zustand'
import { shuffleCards } from '../utils'

export const useCardStore = create((set) => ({
  myCards: shuffleCards(),
  setMyCards: (myCards) => set({ myCards }),

  chosenCards: [],
  setChosenCards: (chosenCards) => set({ chosenCards }),
}))
