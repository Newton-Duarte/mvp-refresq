import { Link, useLocation } from "react-router-dom";
import { Container, Content, Navigation, NavItem } from "./styles";

export function Header() {
  const { pathname } = useLocation()

  return (
    <Container>
      <Content>
        <h3>Refresq MVP</h3>
        
        <Navigation>
          <NavItem
            active={pathname === '/'}
          >
            <Link
              to="/"
            >Home</Link>
          </NavItem>
          <NavItem
            active={pathname === '/movimentos'}
          >
            <Link
              to="/movimentos"
            >Movimentos</Link>
          </NavItem>
        </Navigation>
      </Content>
    </Container>
  )
}