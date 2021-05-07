import { Container } from './styles'

export function Badge({ children, ...rest }) {
  return (
    <Container {...rest}>
      {children}
    </Container>
  )
}