// import { useMovements } from '../../../hooks/useMovements';
import { formatDate } from '../../../utils/formatDate';
import { convertStringToCompare } from '../../../utils/convertStringToCompare'
import { Container } from './styles';
import { FiEdit2, FiTrash, FiCheck } from 'react-icons/fi'
import { ButtonIcon } from '../../Common'
import { Tooltip } from '../../Common/Tooltip';

export function MovementsTable({ movements, search, onEdit, onComplete, onDelete }) {
  const renderMovements = movements.filter(
    obj => Object.keys(obj)
      .some(key => convertStringToCompare(obj[key])
      .includes(convertStringToCompare(search)))
    )

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Número</th>
            <th>Data</th>
            <th>Veículo</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {renderMovements.map(movement => (
            <tr key={movement.id}>
              <td>{movement.customer}</td>
              <td>{movement.id}</td>
              <td>
                {formatDate(new Date(movement.createdAt), 'pt-BR')}
              </td>
              <td>{movement.vehicle}</td>
              <td className={movement.status}>{movement.status}</td>
              <td>
                <Tooltip text="Editar">
                  <ButtonIcon
                    onClick={() => onEdit(movement)}
                  >
                    <FiEdit2 />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Finalizar">
                  <ButtonIcon
                    onClick={() => onComplete(movement.id)}
                    disabled={movement.status === 'Cancelado' || movement.status === 'Finalizado'}
                  >
                    <FiCheck />
                  </ButtonIcon>
                </Tooltip>
                <Tooltip text="Excluir">
                  <ButtonIcon
                    onClick={() => onDelete(movement.id)}
                    disabled={movement.status === 'Cancelado'}
                  >
                    <FiTrash />
                  </ButtonIcon>
                </Tooltip>
              </td>
            </tr>
          ))}
          {!renderMovements.length && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum registro encontrado com o termo: <strong>{search}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
}