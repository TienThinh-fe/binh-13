import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// #region styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`

const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
`

const Label = styled.label`
  font-size: 1rem;
  font-weight: 400;
`

const Input = styled.input`
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
`

const Button = styled.button`
  font-size: 1rem;
  font-weight: 400;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1.2rem;
`
// #endregion

export const Start = () => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/game')
  }

  return (
    <Container>
      <Title>Binh 13</Title>

      <Form autoComplete="off" onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" />
        </InputContainer>

        <InputContainer>
          <Label htmlFor="room">Room</Label>
          <Input type="text" id="room" />
        </InputContainer>

        <Button type="submit">Start</Button>
      </Form>
    </Container>
  )
}
