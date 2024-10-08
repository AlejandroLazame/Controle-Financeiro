import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import './styles/Transaction.css';
import TransactionDetails from './TransactionDetails';
import useModal from '../hooks/useModal';
import Modal from './Modal';
export interface ITransaction {
    _id: string,
    description: string,
    value: number,
    type: string,
    date: Date,
    category: { name: string}     
}

export const TransactionItem: React.FC<ITransaction> = ({_id, description, value, type, date, category}) => {
  const input = {
    _id
  }
  
  const {isOpen, openModal, closeModal } = useModal(
  <>
    <TransactionDetails input={input}/>
  </>
  );
  return (
    <>
      <li key= {_id} className="Transaction">
          <div className='type-icon'>
            <FontAwesomeIcon icon={type === 'Expense' ?  faCircleMinus : faCirclePlus} size='4x'/>
          </div>
          <div className='divider-container'>
            <hr className='dashed v-divider'></hr>
          </div>
          <div className='card-content'>
            <section className='badges'>
              <div className= {type === 'Expense'? 'expense-type-badge' : 'receipt-type-badge'} >
                <p>{ type === 'Expense' ? 'Despesa' : 'Receita' }</p>
              </div>
              {type === 'Expense' ? <div className='category-badge'>
                <p> { category.name } </p>
              </div> : ''}
            </section>
            <hr className='h-divider'/>
            <section className="dataText">
                <p className='data-lancamento'>{ new Date(date).toLocaleDateString() }</p>
                <h1 className='valor-lancamento'>R$ { value.toFixed(2) }</h1>
                <p className='descricao-lancamento'>Descrição: { description }</p>
            </section>
          </div>
          <div className='detail-icon' onClick={openModal}>
            <FontAwesomeIcon icon={faChevronRight} size='3x'/>
          </div>
      </li>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {isOpen} <TransactionDetails input={input}/>
      </Modal>
    </>
  )
}

export default TransactionItem