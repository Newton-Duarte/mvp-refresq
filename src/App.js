import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from './routes'
import { GlobalStyle } from './styles/global'
import { Header } from './components/Header'
import { AppContainer } from './styles/layout'
import { AppProvider } from './hooks'

export function App() {
  return (
    <Router>
      <AppProvider>
        <Header />
        <AppContainer>
          <Routes />
        </AppContainer>
      </AppProvider>
      <GlobalStyle />
    </Router>
  )
}