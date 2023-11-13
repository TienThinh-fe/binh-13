import { useMultiplayerState, myPlayer } from 'playroomkit'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getOpponentCards } from '../../utils'
import BackCard from '../BackCard'
import Card from '../Card'

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`

const OpponentCards = () => {
  const [playersHand] = useMultiplayerState('playersHand')
  const myId = myPlayer().id

  const [opponentHand, setOpponentHand] = useState([])

  useEffect(() => {
    if (playersHand.length !== 2) return

    const opponentHand = getOpponentCards(myId, playersHand)

    if (opponentHand.length === 5) {
      setOpponentHand(opponentHand)
    }
  }, [playersHand, myId])

  return (
    <Wrapper>
      {opponentHand.length === 5 ? (
        opponentHand.map((card, index) => (
          <Card key={index} index={index} {...card} isPositionFixed />
        ))
      ) : (
        <>
          <BackCard index={0} isPositionFixed />
          <BackCard index={1} isPositionFixed />
          <BackCard index={2} isPositionFixed />
          <BackCard index={3} isPositionFixed />
          <BackCard index={4} isPositionFixed />
        </>
      )}
    </Wrapper>
  )
}

export default OpponentCards
