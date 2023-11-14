import PropTypes from 'prop-types'
import styled from 'styled-components'
import Card from '../Card'
import EmptySlot from '../EmptySlot'
import { useState, useEffect } from 'react'
import { useCardStore } from '../../stores'
import { choseACard } from '../../utils'

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  left: ${({ width }) => (width - 700) / 2}px;
  bottom: 12px;
`

const MyCards = () => {
  const [myCards, setMyCards] = useCardStore((state) => [
    state.myCards,
    state.setMyCards,
  ])
  const [width, setWidth] = useState(window.innerWidth * 0.6)
  const [chosenCards, setChosenCards] = useCardStore((state) => [
    state.chosenCards,
    state.setChosenCards,
  ])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.6)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleClickCard = (card) => {
    const firstLength = chosenCards.first.length
    const secondLength = chosenCards.second.length

    if (firstLength === 5 && secondLength === 5) return

    const newMyCards = choseACard(myCards, card)
    setMyCards(newMyCards)

    if (firstLength < 5) {
      const newChosenCards = {
        ...chosenCards,
        first: [...chosenCards.first, card],
      }
      setChosenCards(newChosenCards)
    } else if (secondLength < 5) {
      const newChosenCards = {
        ...chosenCards,
        second: [...chosenCards.second, card],
      }
      setChosenCards(newChosenCards)
    }
  }

  return (
    <Wrapper width={width}>
      {myCards.map((card, index) =>
        card.isChosen ? (
          <EmptySlot key={index} index={index} />
        ) : (
          <Card
            key={index}
            {...card}
            index={index}
            onClickCard={handleClickCard}
          />
        ),
      )}
    </Wrapper>
  )
}

MyCards.propTypes = {
  cards: PropTypes.array,
}

export default MyCards
