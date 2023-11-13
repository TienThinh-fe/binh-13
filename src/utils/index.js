import { isEmpty } from 'lodash'

const CARD_NAME = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
]
const CARD_RANK = ['C', 'D', 'H', 'S']

export const mappingCard = () => {
  const cards = []

  CARD_NAME.forEach((name) => {
    CARD_RANK.forEach((rank) => {
      cards.push(`${name}-${rank}`)
    })
  })

  return cards
}

export const getCardsSrc = () => {
  const cards = mappingCard()
  const cardSrc = []
  cards.forEach((card) => {
    cardSrc.push({
      src: `assets/cards/${card}.png`,
      name: card,
      prefix: card.split('-')[0],
      suffix: card.split('-')[1],
      isChosen: false,
    })
  })
  return cardSrc
}

export const getCardByName = (name) => {
  const cards = getCardsSrc()
  return cards.find((card) => card.name === name)
}

// Shuffle and get 13 cards from 52 cards
// Each card only appears once
export const shuffleCards = () => {
  const cards = getCardsSrc()
  const shuffledCards = []
  while (shuffledCards.length < 13) {
    const randomIndex = Math.floor(Math.random() * cards.length)
    const card = cards[randomIndex]
    if (!shuffledCards.includes(card)) {
      shuffledCards.push(card)
    }
  }
  return shuffledCards
}

export const emptyFunction = () => {}

export const choseACard = (cards, chosenCard) => {
  // make isChosen true for chosenCard
  const newCards = cards.map((card) => {
    if (card.name === chosenCard.name) {
      return {
        ...card,
        isChosen: true,
      }
    }
    return card
  })

  return newCards
}

export const getOpponentCards = (playerId, playersHand) => {
  if (isEmpty(playersHand) || isEmpty(playerId)) return []

  const opponentCards = []

  playersHand.forEach((playerHand) => {
    const playerHandId = Object.keys(playerHand)[0]
    if (playerHandId !== playerId) {
      opponentCards.push(...playerHand[playerHandId])
    }
  })

  return opponentCards
}
