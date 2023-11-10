import styled from 'styled-components'
import BackCard from '../BackCard'

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
`

const OpponentCards = () => {
  return (
    <Wrapper>
      <BackCard index={0} isPositionFixed />
      <BackCard index={1} isPositionFixed />
      <BackCard index={2} isPositionFixed />
      <BackCard index={3} isPositionFixed />
      <BackCard index={4} isPositionFixed />
    </Wrapper>
  )
}

export default OpponentCards
