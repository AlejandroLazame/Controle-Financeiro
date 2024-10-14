import { FormEvent, useEffect, useState } from 'react';
import useFecth from '../../hooks/useFecth';

import '../styles/NewTransaction.css';

import { ICategory } from '../Category/Category';

interface INewTransaction {
  NewTransaction: {
    type: string,
    description: string,
    value: number,
    category?: string
  }
}

interface INewTransactionProps {
  closeModal: ()=> void;
  fetchTransaction: ()=> void;
}

const NewTransaction: React.FC<INewTransactionProps> = ({closeModal, fetchTransaction}) => {
  const [categories, setCategories] = useState<Array<ICategory> | null>(null)
  const [transactionType, setTransactionType] = useState<string>('Expense');
  const [value, setValue] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [variables, setVariables] = useState<INewTransaction>();
  
  
  const query = `
    query {
      listCategories {
        _id
        name
      }
    }
  `;

  const mutation = `
    mutation addNewTransaction($NewTransaction: NewTransactionInput!){
      addNewTransaction(input: $NewTransaction){
        ...on Expense{
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

  const { data, loading, error} = useFecth(query);
  
  const NewTransaction = useFecth(mutation, variables);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTransaction: INewTransaction = {
      NewTransaction: {
        type: transactionType,
        value,
        description,
        category
      }
    }

    setVariables(newTransaction);
  }

  useEffect(()=>{
    if(data){
      setCategories(data.listCategories);
    }
  },[data])

  useEffect(()=>{
    if (NewTransaction.data) {
        closeModal();
        fetchTransaction();
    }
  }, [NewTransaction, closeModal, fetchTransaction])

  return (
    <div className="new-transaction">
      <header className="transaction-header">
          <h4 className="header-title">Cadastrar nova transação</h4>
          <small className="header-description">Preencha os campos abaixo para adicionar uma nova transação.</small>
      </header>
      <hr className='h-divider w-100'/>
      <form className="form-new-transaction" id='form-new-transaction' onSubmit={handleSubmit}>
        <label>
          <h4 className="transaction-type" id='transaction-type'>Tipo da transação</h4>
          <select name="select-transaction-type" className="select-transaction-type" id="select-transaction-type" onChange={(e)=>{setTransactionType(e.target.value)}}>
            <option className='option-transaction-type' value="Expense">Despesa</option>
            <option className='option-transaction-type'value="Receipt">Receita</option>
          </select>
        </label>
        { transactionType === 'Expense' ? 
        <label>
          <h4 className="transaction-category" id='transaction-category'>Categoria</h4>
          <select name="select-transaction-category" id="select-transaction-category" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="">Selecione uma categoria...</option>
            {categories && categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </label> : null
        }
        <label>
          <h4 className="transaction-value">Valor</h4>
          <input type="number" className="input-transaction-value" id='input-transaction-value' onChange={(e)=>{setValue(+e.target.value)}}/>
        </label>
        <label>
          <h4 className="transaction-description">Descrição</h4>
          <textarea className="textarea-transaction-description" id='textarea-transaction-description' onChange={(e)=>{setDescription(e.target.value)}}/>
        </label>
        {/* <label>
          <h4 className="transaction-description">Data</h4>
          <input type='date' className="input-transaction-date" id='input-transaction-date'  defaultValue={new Date().toLocaleDateString()} onChange={(e)=>{setDate(e.target.value)}}/>
        </label> */}
        <div className="action-buttons" id='new-transaction-buttons'>
          <button type= "submit" className="save-button success" formTarget='form-new-transaction'>
              Salvar
          </button>
        </div>
      </form>
      {NewTransaction.loading && 'Salvando nova transacao...'}
      {NewTransaction.error && `Erro ao gravar transacao: ${NewTransaction.error}`}
    </div>
  )
}

export default NewTransaction