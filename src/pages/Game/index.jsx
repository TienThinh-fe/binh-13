import { myPlayer, useMultiplayerState } from 'playroomkit'
import { useEffect } from 'react'
import styled from 'styled-components'
import BackCard from '../../components/BackCard'
import ChosenCards from '../../components/ChosenCards'
import MyCards from '../../components/MyCards'
import { determineWinner } from '../../utils/game'
import { checkHaveInvalidHand, checkTwoPlayersReady } from '../../utils'

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
  const [isTwoPlayersReady] = useMultiplayerState('isTwoPlayersReady', [])

  useEffect(() => {
    const isCompleted = checkTwoPlayersReady(isTwoPlayersReady)
    if (playersHand.length !== 2 || !isCompleted) return

    const player1Hand = playersHand[0]
    const player2Hand = playersHand[1]

    const isPlayer1HandInvalid = checkHaveInvalidHand(player1Hand)
    const isPlayer2HandInvalid = checkHaveInvalidHand(player2Hand)

    if (isPlayer1HandInvalid || isPlayer2HandInvalid) {
      return
    }

    console.log('playersHand', playersHand)
    console.log('isTwoPlayersReady', isTwoPlayersReady)

    const winner = determineWinner(player1Hand, player2Hand)

    if (winner === myPlayer().id) {
      alert('You win!')
    } else if (winner === 'draw') {
      alert('Draw!')
    } else {
      alert('You lose!')
    }
  }, [playersHand, isTwoPlayersReady])

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
