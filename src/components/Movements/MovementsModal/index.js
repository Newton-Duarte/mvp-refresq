import { useCallback, useEffect, useState } from "react";
import { FiPlus } from 'react-icons/fi'

import { Modal, Select, Button, Input, FormGroup, Badge } from "../../Common";
import { MovementProductsTable } from '../MovementProductsTable'
import { EditMovementItemModal } from '../EditMovementItemModal'

import { AddItem, Container, Header, ItemsContainer } from './styles';

export function MovementModal({ isOpen, onRequestClose, editMovement, onSubmit }) {
  const [movement, setMovement] = useState({
    customer: '',
    vehicle: '',
    status: 'Pendente',
    items: []
  })
  const [movementItem, setMovementItem] = useState({
    productId: '',
    requestedQuantity: 1,
    quantity: 1,
    brokenQuantity: 0,
    expiredQuantity: 0
  })
  const [lastId, setLastId] = useState(0)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editMovementItem, setEditMovementItem] = useState()

  useEffect(() => {
    if (editMovement) {
      setMovement(editMovement)
    }
  }, [editMovement])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...movement
    })

    resetForm()
  }, [movement, onSubmit]);

  const resetForm = () => {
    setMovement({
      customer: '',
      vehicle: '',
      status: 'Pendente',
      items: []
    })
  }

  const handleAddItem = useCallback(() => {
    const newItem = {
      ...movementItem,
      id: lastId + 1,
      quantity: movementItem.requestedQuantity,
      brokenQuantity: 0,
      expiredQuantity: 0
    }

    setLastId(
      lastId + 1
    )

    setMovement({
      ...movement,
      items: [
        ...movement.items,
        newItem
      ]
    })
  }, [lastId, movement, movementItem])

  const handleEditItemClick = id => {
    const item = movement.items.find(mItem => mItem.id === id)
    setEditMovementItem(item)
    setIsItemModalOpen(true)
  }

  const handleEditItem = item => {
    setMovement({
      ...movement,
      items: movement.items.map(mapItem => {
        if (mapItem.id === item.id) {
          return {
            ...item,
            quantity: item.requestedQuantity - item.brokenQuantity - item.expiredQuantity
          }
        } else {
          return mapItem
        }
      })
    })

    setIsItemModalOpen(false)
  }

  const handleDeleteItem = id => {
    console.log(id)

    setMovement({
      ...movement,
      items: movement.items.filter(item => item.id !== id)
    })
  }

  const handleCloseItemModal = () => {
    setEditMovementItem()
    setIsItemModalOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      size="large"
    >
      <Container onSubmit={handleSubmit}>
        <Header>
          <h2>{movement.id ? 'Editar Movimento' : 'Novo Movimento'}</h2>
          {movement.id && <Badge className={movement.status}>{movement.status}</Badge>}
        </Header>
        <FormGroup>
          <Select
            name="customer"
            label="Cliente"
            value={movement.customer}
            onChange={({ target }) => setMovement({ ...movement, customer: target.value })}
            disabled={movement.status !== 'Pendente'}
          >
            <option value="José Ariosvaldo">José Ariosvaldo</option>
            <option value="João Bernardo">João Bernardo</option>
          </Select>
          <Select
            name="vehicle"
            label="Veículo"
            value={movement.vehicle}
            onChange={({ target }) => setMovement({ ...movement, vehicle: target.value })}
            disabled={movement.status !== 'Pendente'}
          >
            <option value="Caminhao ABC1234">Caminhao ABC1234</option>
            <option value="Ranger MUT1999">Ranger MUT1999</option>
          </Select>
        </FormGroup>
        {movement.id && (
          <ItemsContainer>
            <h4>Itens</h4>
            <AddItem>
              <Select
                name="product"
                label="Produto"
                value={movementItem.productId}
                onChange={({ target }) => setMovementItem({ ...movementItem, productId: target.value })}
                containerStyle={{ maxWidth: '50%', marginRight: '1rem' }}
                disabled={movement.status !== 'Pendente'}
              >
                <option value="Lacre">Lacre</option>
              </Select>
              <Input
                name="requested_quantity"
                label="Quantidade"
                value={movementItem.requestedQuantity}
                onChange={({ target }) => setMovementItem({ ...movementItem, requestedQuantity: target.value })}
                containerStyle={{ maxWidth: '40%', marginRight: '1rem' }}
                disabled={movement.status !== 'Pendente'}
              />
              <Button onClick={handleAddItem} disabled={movement.status !== 'Pendente'}>
                <FiPlus />
              </Button>
            </AddItem>
            <MovementProductsTable
              movement={movement}
              onEditClick={handleEditItemClick}
              onDeleteClick={handleDeleteItem}
            />
          </ItemsContainer>
        )}
        <Button type="submit" disabled={movement.status !== 'Pendente'}>Salvar</Button>
      </Container>
      <EditMovementItemModal
        isOpen={isItemModalOpen}
        onRequestClose={handleCloseItemModal}
        movementItem={editMovementItem}
        onSubmit={handleEditItem}
      />
    </Modal>
  )
}