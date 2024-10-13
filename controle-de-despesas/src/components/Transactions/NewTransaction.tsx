import { useEffect, useState } from 'react';
import useFecth from '../../hooks/useFecth';

import '../styles/NewTransaction.css';

import { ICategory } from '../Category/Category';


const NewTransaction = () => {
  const [transactionType, setTransactionType] = useState<string>('Expense');
  const [categories, setCategories] = useState<Array<ICategory> | null>(null)
  
  const query = `
    query {
      listCategories {
        _id
        name
      }
    }
  `;

  const { data, loading, error} = useFecth(query);
  
  useEffect(()=>{
    if(data){
      setCategories(data.listCategories);
    }
  },[data])

  return (
    <div className="new-transaction">
      <header className="transaction-header">
          <h4 className="header-title">Cadastrar nova transação</h4>
          <small className="header-description">Preencha os campos abaixo para adicionar uma nova transação.</small>
      </header>
      <hr className='h-divider w-100'/>
      <form className="form-new-transaction">
        <label htmlFor="#">
          <h4 className="transaction-type">Tipo da transação</h4>
          <select name="select-transaction-type" className="select-transaction-type" id="select-transaction-type" onChange={(e)=>{setTransactionType(e.target.value)}}>
            <option value="Expense">Despesa</option>
            <option value="Receipt">Receita</option>
          </select>
        </label>
        { transactionType === 'Expense' ? 
        <label htmlFor="#">
          <h4 className="transaction-category">Categoria</h4>
          <select name="select-transaction-category" id="select-transaction-category">
            <option value="">Selecione uma categoria...</option>
            {categories && categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </label> : null
        }
        <label htmlFor="#">
          <h4 className="transaction-value">Valor</h4>
          <input type="number" className="input-transaction-value" />
        </label>
        <label htmlFor="#">
          <h4 className="transaction-description">Descrição</h4>
          <textarea className="textarea-transaction-description" />
        </label>
        <label htmlFor="#">
          <h4 className="transaction-description">Data</h4>
          <input type='date' className="input-transaction-date" defaultValue={new Date().toLocaleDateString()}/>
        </label>
      </form>
      <div className="action-buttons" id='new-transction-buttons'>
        <button type= "button" className="save-button success">
            Salvar
        </button>
      </div>
    </div>
  )
}

export default NewTransaction