import { myPlayer, useMultiplayerState } from 'playroomkit'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import { useCardStore } from '../../stores'
import { unChoseACard } from '../../utils'
import Card from '../Card'
import EmptySlot from '../EmptySlot'
import { isEmpty } from 'lodash'
import { compareTwoHands } from '../../utils/game'

const Wrapper = styled.div`
  width: 40%;
  height: 100%;
  border-left: 4px solid #706f6f;
  position: relative;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const HandWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`

const ActionWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 12%;
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
  const [myCards, setMyCards] = useCardStore((state) => [
    state.myCards,
    state.setMyCards,
  ])

  const [chosenCards, setChosenCards] = useCardStore((state) => [
    state.chosenCards,
    state.setChosenCards,
  ])

  const [isCompleted, setIsCompleted] = useState(false)

  const emptyFirstSlots = Array(5 - chosenCards.first.length).fill(null)
  const emptySecondSlots = Array(5 - chosenCards.second.length).fill(null)

  const [playersHand, setPlayersHand] = useMultiplayerState('playersHand', [])
  const [isTwoPlayersReady, setIsTwoPlayersReady] = useMultiplayerState(
    'isTwoPlayersReady',
    [],
  )

  const handleComplete = () => {
    const myPlayerId = myPlayer().id

    const firstHand = chosenCards.first
    const secondHand = chosenCards.second

    if (isEmpty(firstHand) || isEmpty(secondHand)) {
      return
    }

    if (compareTwoHands(firstHand, secondHand)) {
      const myHands = {
        [myPlayerId]: chosenCards,
      }

      setPlayersHand([...playersHand, myHands])
      setIsCompleted(true)
      setIsTwoPlayersReady([...isTwoPlayersReady, true])
    } else {
      alert('Your first hand is not better than your second hand')
    }
  }

  const handleClickMyCard = (card, key) => {
    const newMyCards = unChoseACard(myCards, card)
    setMyCards(newMyCards)

    const chosenCardsAsKey = chosenCards[key]
    const newChosenCards = chosenCardsAsKey.filter(
      (chosenCard) => chosenCard.name !== card.name,
    )

    setChosenCards({ ...chosenCards, [key]: newChosenCards })
  }

  const handleReset = () => {
    setChosenCards({ first: [], second: [] })
    setMyCards(myCards.map((card) => ({ ...card, isChosen: false })))
  }

  return (
    <Wrapper>
      <Container>
        <HandWrapper>
          {chosenCards.first.map((card, index) => (
            <Card
              key={index}
              {...card}
              index={index}
              isPositionFixed
              onClickCard={(card) => handleClickMyCard(card, 'first')}
            />
          ))}
          {emptyFirstSlots.map((_, index) => (
            <EmptySlot key={index + chosenCards.first.length} isPositionFixed />
          ))}
        </HandWrapper>
        <HandWrapper>
          {chosenCards.second.map((card, index) => (
            <Card
              key={index}
              {...card}
              index={index}
              isPositionFixed
              onClickCard={(card) => handleClickMyCard(card, 'second')}
            />
          ))}
          {emptySecondSlots.map((_, index) => (
            <EmptySlot
              key={index + chosenCards.second.length}
              isPositionFixed
            />
          ))}
        </HandWrapper>
      </Container>
      <ActionWrapper>
        {!isCompleted ? (
          <Button
            disabled={
              chosenCards.first.length < 5 || chosenCards.second.length < 5
            }
            onClick={handleComplete}
          >
            Complete
          </Button>
        ) : (
          <Button disabled>Waiting for other players...</Button>
        )}
        <Button disabled={isCompleted} onClick={handleReset}>
          Reset
        </Button>
      </ActionWrapper>
    </Wrapper>
  )
}

ChosenCards.propTypes = {
  cards: PropTypes.array,
}

export default ChosenCards
