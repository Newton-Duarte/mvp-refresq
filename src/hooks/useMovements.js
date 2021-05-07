import { createContext, useContext, useEffect, useState } from 'react'

const MovementsContext = createContext({})

export function MovementsProvider({ children }) {
  const [movements, setMovements] = useState([])

  useEffect(() => {
    setMovements([
      {
        id: 1,
        customerId: 1,
        customer: 'Fulano de Tal',
        vehicleId: 1,
        vehicle: 'Caminhao XYZ1234',
        items: [],
        status: 'Pendente',
        createdAt: new Date(2021, 3, 28)
      },
      {
        id: 2,
        customerId: 2,
        customer: 'Siclano de Tal',
        vehicleId: 2,
        vehicle: 'Caminhao ABC4321',
        items: [],
        status: 'Faturado',
        createdAt: new Date(2021, 3, 28)
      },
      {
        id: 3,
        customerId: 3,
        customer: 'Beltrano de Tal',
        vehicleId: 3,
        vehicle: 'Caminhao FFA4000',
        items: [],
        status: 'Finalizado',
        createdAt: new Date(2021, 3, 28)
      },
      {
        id: 4,
        customerId: 4,
        customer: 'Francisco Roberto',
        vehicleId: 4,
        vehicle: 'Caminhao FDD1844',
        items: [],
        status: 'Cancelado',
        createdAt: new Date(2021, 3, 28)
      }
    ])
  }, [])

  function createMovement(movementInput) {
    const lastId = movements[movements.length - 1].id
    setMovements([...movements, {
      ...movementInput,
      createdAt: new Date(),
      id: lastId ? lastId + 1 : 1,
      status: 'Pendente',
      items: []
    }])
  }

  function editMovement(movementInput) {
    setMovements(
      movements.map(mapMovement => {
        if (mapMovement.id === movementInput.id) {
          return {
            ...movementInput
          }
        } else {
          return mapMovement
        }
      })
    )
  }

  function deleteMovement(id) {
    setMovements(
      movements.map(movement => {
        if (movement.id === id) {
          return {
            ...movement,
            status: 'Cancelado'
          }
        } else {
          return movement
        }
      })
    )
  }

  function completeMovement(id) {
    setMovements(
      movements.map(movement => {
        if (movement.id === id) {
          return {
            ...movement,
            status: 'Finalizado'
          }
        } else {
          return movement
        }
      })
    )
  }

  return (
    <MovementsContext.Provider value={{ movements, createMovement, editMovement, deleteMovement, completeMovement }}>
      {children}
    </MovementsContext.Provider>
  )
}

export function useMovements() {
  const context = useContext(MovementsContext)

  return context
}