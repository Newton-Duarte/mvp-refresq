import styled from 'styled-components';

export const Container = styled.form`
  h2 {
    margin-bottom: 2rem;
    color: var(--text-title);
  }
  button[type="submit"] {
    margin-top: 2rem;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;

    h2 {
      margin-bottom: 1rem;
    }
  }

  & div.Pendente,
  & div.Faturado,
  & div.Finalizado,
  & div.Cancelado {
    max-width: 100px;
    margin-bottom: 2rem;
  }
`

export const ItemsContainer = styled.div`
  margin-top: 1rem;
`

export const AddItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  button {
    margin-top: 24px;
    max-width: 48px;
    height: 54px;
  }
`