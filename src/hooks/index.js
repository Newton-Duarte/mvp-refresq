import { MovementsProvider } from './useMovements'

export function AppProvider({ children }) {
  return (
    <MovementsProvider>
      {children}
    </MovementsProvider>
  )
}