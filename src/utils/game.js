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

export const compareTwoHands = (firstHand, secondHand) => {
  const firstHandRank = Hand.solve(firstHand.map(convertCard)).rank
  const secondHandRank = Hand.solve(secondHand.map(convertCard)).rank
  // const thirdHandRank = Hand.solve(thirdHand.map(convertCard)).rank

  if (firstHandRank < secondHandRank) {
    return false
  }

  return true
}

export const determineWinner = (player1, player2) => {
  const playerId1 = Object.keys(player1)[0]
  const playerId2 = Object.keys(player2)[0]

  const player1Hand1 = Hand.solve(player1[playerId1].first.map(convertCard))
  const player1Hand2 = Hand.solve(player1[playerId1].second.map(convertCard))

  const player2Hand1 = Hand.solve(player2[playerId2].first.map(convertCard))
  const player2Hand2 = Hand.solve(player2[playerId2].second.map(convertCard))

  const hand1 = Hand.winners([player1Hand1, player2Hand1])
  const hand2 = Hand.winners([player1Hand2, player2Hand2])

  const score1 = hand1[0].rank
  const score2 = hand2[0].rank

  if (score1 < score2) {
    return playerId1
  } else if (score1 > score2) {
    return playerId2
  } else {
    return 'draw'
  }
}
