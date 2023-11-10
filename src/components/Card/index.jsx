import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { emptyFunction, getCardByName } from '../../utils'
import { motion } from 'framer-motion'

const Wrapper = styled(motion.div)`
  width: 100px;
  height: 145px;
  cursor: pointer;
  box-shadow: 0 0 10px 0 rgba(26, 26, 26, 0.5);
  border-radius: 5px;

  ${({ isPositionFixed, index }) =>
    !isPositionFixed &&
    css`
      position: absolute;
      bottom: 20px;
      left: ${index * 50}px;
      z-index: ${index};
    `}
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Card = ({
  name,
  index,
  isPositionFixed = false,
  onClickCard = emptyFunction,
}) => {
  const card = getCardByName(name)

  const handleClick = () => {
    onClickCard && onClickCard(card)
  }

  return (
    <Wrapper
      index={index}
      whileHover={{ y: -10 }}
      transition={{ stiffness: 300 }}
      isPositionFixed={isPositionFixed}
      onClick={handleClick}
    >
      <Image draggable={false} src={card.src} />
    </Wrapper>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  index: PropTypes.number,
  isPositionFixed: PropTypes.bool,
  onClickCard: PropTypes.func,
}

export default Card
