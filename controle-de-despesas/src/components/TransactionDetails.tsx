import React, { useEffect, useState } from 'react'
import useFecth from '../hooks/useFecth'
import { ObjectId } from 'mongoose'
import './styles/TransactionDetails.css';
interface IFilterTransaction {
  input: {
    _id: string
  }
}

const TransactionDetails: React.FC<IFilterTransaction> = ({ input }) => {
  interface ITransaction {
    _id: ObjectId,
    description: string,
    type: string,
    category: {
      name: string
    },
    date: Date,
    value: number
  }

  const query = `
    query ($ID: filterTransactionInput!){
      getTransactionById(input: $ID){
        ...on Expense {
          _id
          description
          value
          type
          date
          category {
            name
          }
        }
        ...on Receipt {
          _id
          description
          value
          type
          date
        }
      }
    }
  `;

  const {data, error, loading} = useFecth(query, {ID: {...input}});
  
  const [transaction, setTransaction] = useState<ITransaction>(data);
  
  useEffect(()=>{
    if(data && data.getTransactionById) {
      setTransaction(data.getTransactionById);
    }  
  },[data]);
  
  return (
      <>
        <header className='details-header'>
            <h3>Detalhes da transação</h3>
            <small>{transaction && transaction.hasOwnProperty('_id') ? transaction._id.toString() : null}</small>
        </header>
        <hr />
        { transaction ?
          <div className='details-content'>
            <p className='data-lancamento'>Data: { new Date(transaction.date).toLocaleDateString() }</p>
            <p className='descricao-lancamento'>Descrição: {transaction.description}</p>
            <p className='tipo-lancamento'>Tipo do lançamento: {transaction.type === 'Expense' ? 'Despesa' : 'Receita' }</p>
            {transaction.type === 'Expense' && <p className='categoria-lancamento'>Categoria: {transaction.category.name || 'N/A'}</p>}
            <p className='valor-lancamento'>Valor: R$ {transaction.value.toFixed(2)}</p>
          </div> : 
          <p> Carregando... </p>
        }
      </>
  )
}

export default TransactionDetails;