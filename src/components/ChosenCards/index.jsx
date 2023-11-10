import { myPlayer, useMultiplayerState } from 'playroomkit'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useCardStore } from '../../stores'
import Card from '../Card'
import EmptySlot from '../EmptySlot'
import OpponentCards from '../OpponentCards'
import { useState } from 'react'

const Wrapper = styled.div`
  width: 40%;
  height: 100%;
  border-left: 4px solid #706f6f;
  position: relative;
`

const Container = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 64%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 76%;
  left: 50%;
  transform: translateX(-50%);
`

const Button = styled.button`
  padding: 0 32px;
  height: 50px;
  background-color: #706f6f;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #5e5d5d;
  }

  &:disabled {
    background-color: #444444;
    color: #b5b5b5;
    cursor: not-allowed;
  }
`

const ChosenCards = () => {
  const chosenCards = useCardStore((state) => state.chosenCards)
  const [isCompleted, setIsCompleted] = useState(false)

  const emptySlots = Array(5 - chosenCards.length).fill(null)

  const [playersHand, setPlayersHand] = useMultiplayerState('playersHand', [])

  const handleComplete = () => {
    const myPlayerId = myPlayer().id

    const myHands = {
      [myPlayerId]: chosenCards,
    }

    setPlayersHand([...playersHand, myHands])
    setIsCompleted(true)
  }

  return (
    <Wrapper>
      <Container>
        {chosenCards.map((card, index) => (
          <Card key={index} {...card} index={index} isPositionFixed />
        ))}
        {emptySlots.map((_, index) => (
          <EmptySlot key={index + chosenCards.length} isPositionFixed />
        ))}
      </Container>
      <ActionWrapper>
        {!isCompleted ? (
          <Button disabled={chosenCards.length < 5} onClick={handleComplete}>
            Complete
          </Button>
        ) : (
          <Button disabled>Waiting for other players...</Button>
        )}
      </ActionWrapper>
      <OpponentCards />
    </Wrapper>
  )
}

ChosenCards.propTypes = {
  cards: PropTypes.array,
}

export default ChosenCards
