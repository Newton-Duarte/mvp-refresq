import { Modal } from '../'
import { Button } from '../'

export function Alert({ 
  isOpen,
  onRequestClose,
  onYes,
  onNo,
  action
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      Tem certeza?
      <Button onClick={() => onNo(action)}>Não</Button>
      <Button onClick={() => onYes(action)}>Sim</Button>
    </Modal>
  )
}