import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100px;
  height: 145px;
  position: ${(props) => (props.isCenter ? 'absolute' : 'initial')};
  top: ${(props) => (props.isCenter ? '50%' : 'initial')};
  left: ${(props) => (props.isCenter ? '50%' : 'initial')};
  transform: ${(props) => (props.isCenter ? 'translate(-50%, -50%)' : 'none')};
  box-shadow: 0 0 10px 0 rgba(26, 26, 26, 0.5);
  border-radius: 5px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const BackCard = ({ isCenter, isPositionFixed = false, index }) => {
  return (
    <Wrapper
      index={index}
      isCenter={isCenter}
      isPositionFixed={isPositionFixed}
    >
      <Image src="assets/cards/BACK.png" />
    </Wrapper>
  )
}

BackCard.propTypes = {
  isCenter: PropTypes.bool,
  isPositionFixed: PropTypes.bool,
  index: PropTypes.number,
}

export default BackCard
