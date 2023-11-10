import { myPlayer, useMultiplayerState } from 'playroomkit'
import { useEffect } from 'react'
import styled from 'styled-components'
import BackCard from '../../components/BackCard'
import ChosenCards from '../../components/ChosenCards'
import MyCards from '../../components/MyCards'
import determineWinner from '../../utils/game'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const Main = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
`

export const Game = () => {
  const [playersHand] = useMultiplayerState('playersHand', [])

  useEffect(() => {
    if (playersHand.length !== 2) return

    const player1Hand = playersHand[0]
    const player2Hand = playersHand[1]

    const winner = determineWinner(player1Hand, player2Hand)

    if (winner === myPlayer().id) {
      alert('You win!')
    } else {
      alert('You lose!')
    }
  }, [playersHand])

  return (
    <Wrapper>
      <Container>
        <Main>
          <BackCard isCenter />
          <MyCards />
        </Main>
        <ChosenCards />
      </Container>
    </Wrapper>
  )
}
