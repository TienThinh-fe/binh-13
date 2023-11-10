import { Hand } from 'pokersolver'

function convertCard(card) {
  const prefixMap = {
    10: 'T',
    11: 'J',
    12: 'Q',
    13: 'K',
    1: 'A',
  }

  const prefix = prefixMap[card.prefix] || card.prefix
  const suffix = card.suffix.toUpperCase()

  return prefix + suffix
}

function determineWinner(player1, player2) {
  const playerId1 = Object.keys(player1)[0]
  const playerId2 = Object.keys(player2)[0]

  const hand1 = Hand.solve(player1[playerId1].map(convertCard))
  const hand2 = Hand.solve(player2[playerId2].map(convertCard))

  const winners = Hand.winners([hand1, hand2])

  return winners.includes(hand1) ? playerId1 : playerId2
}

export default determineWinner
