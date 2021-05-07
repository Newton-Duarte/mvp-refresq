import { FiEdit2, FiTrash } from "react-icons/fi";
import { Actions, Container } from "./styles";

export function MovementProductsTable({ 
  movement,
  onEditClick,
  onDeleteClick 
}) {
  const items = movement.items

  return (
    <Container>
      {!items.length 
        ? <p>Nenhum item adicionado</p>
        : (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Produto</th>
                <th>Qtde solicitada</th>
                <th>Qtde quebrada</th>
                <th>Qtde vencida</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productId}</td>
                  <td>
                    {item.requestedQuantity}
                    {(item.brokenQuantity > 0 || item.expiredQuantity > 0) && (
                      <strong>&nbsp;({item.quantity})</strong>
                    )}
                  </td>
                  <td>{item.brokenQuantity}</td>
                  <td>{item.expiredQuantity}</td>
                  <td>
                    <Actions>
                      <button
                        type="button"
                        onClick={() => onEditClick(item.id)}
                        disabled={movement.status !== 'Pendente'}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteClick(item.id)}
                        disabled={movement.status !== 'Pendente'}
                      >
                        <FiTrash size={16} />
                      </button>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </Container>
  )
}