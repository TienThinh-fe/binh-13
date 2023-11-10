import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  width: 100px;
  height: 142px;
  border: 1px solid #818181;
  border-radius: 5px;

  ${({ isPositionFixed, index }) =>
    !isPositionFixed &&
    css`
      position: absolute;
      bottom: 20px;
      left: ${index * 50}px;
      z-index: -1;
    `}
`

const EmptySlot = ({ isPositionFixed = false, index }) => {
  return <Wrapper index={index} isPositionFixed={isPositionFixed} />
}

EmptySlot.propTypes = {
  index: PropTypes.number,
  isPositionFixed: PropTypes.bool,
}

export default EmptySlot
