import { useCallback, useEffect, useState } from "react";

import { Modal } from "../../Common";
import { Select } from '../../Common'
import { Button } from '../../Common'
import { Input } from "../../Common";

import { Container } from './styles';

export function EditMovementItemModal({ isOpen, onRequestClose, movementItem, onSubmit }) {
  const [editMovementItem, setEditMovementItem] = useState({
    id: '',
    productId: '',
    requestedQuantity: 1,
    brokenQuantity: 0,
    expiredQuantity: 0
  })

  useEffect(() => {
    if (movementItem) {
      setEditMovementItem(movementItem)
    }
  }, [movementItem])

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    onSubmit({
      ...editMovementItem
    })
  }, [editMovementItem, onSubmit])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      size="small"
    >
      <Container onSubmit={handleSubmit}>
        <h2>Editar Item</h2>
        <Select
          name="product"
          label="Produto"
          value={editMovementItem.productId}
          onChange={({ target }) => setEditMovementItem({ ...editMovementItem, productId: target.value })}
        >
          <option value="Lacre">Lacre</option>
        </Select>
        <Input
          name="quantity"
          label="Quantidade"
          value={editMovementItem.requestedQuantity}
          onChange={({ target }) => setEditMovementItem({ ...editMovementItem, requestedQuantity: target.value })}
        />
        <Input
          name="broken_quantity"
          label="Quantidade quebrada"
          value={editMovementItem.brokenQuantity}
          onChange={({ target }) => setEditMovementItem({ ...editMovementItem, brokenQuantity: target.value })}
        />
        <Input
          name="expired_quantity"
          label="Quantidade vencida"
          value={editMovementItem.expiredQuantity}
          onChange={({ target }) => setEditMovementItem({ ...editMovementItem, expiredQuantity: target.value })}
        />
        <Button type="submit">Salvar</Button>
      </Container>
    </Modal>
  )
}