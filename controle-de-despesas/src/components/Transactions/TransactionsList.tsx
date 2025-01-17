import useFecth from "../../hooks/useFecth";
import { useModal } from "../../contexts/Modal.context";
import { MouseEventHandler, useEffect, useState } from "react";

import CategoriesList from "../Category/CategoriesList";
import Modal from "../Modal/Modal";

import { TransactionItem, ITransaction } from "./Transaction";
import '../styles/TransactionsList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faFilter, faTags } from "@fortawesome/free-solid-svg-icons";
import NewTransaction from "./NewTransaction";

const TransactionsList = () => {
  const [Transactions, setTransactions] = useState<ITransaction[]>([]);
  const { openModal, closeModal } = useModal();

  const handleCategoriesModal: MouseEventHandler = () => {
    openModal(<Modal><CategoriesList /></Modal>)
  }

  const handleNewTransactionModal: MouseEventHandler = () => {
    openModal(<Modal><NewTransaction closeModal={closeModal} fetchTransaction={refetchTransactions}/></Modal>)
  }

  const query = `
    query {
        listTransactions {
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

  
  const { data, loading, error, refetch } = useFecth(query);
  
  useEffect(()=> {
    if(data){
      setTransactions(data.listTransactions);
    }
  }, [data]);
  
  
  const refetchTransactions = async () => {
    refetch();
  };
  
  return (
    <>
      <ul className="TransactionsList">
          <div className="buttons">
            <div className="main-action-buttons">
              <button className="primary-button" onClick={handleNewTransactionModal}>
                <FontAwesomeIcon icon={faFileCirclePlus} size="2x"/>
                Nova transação
              </button>
              {/* <button className="delete-button danger">
                <FontAwesomeIcon icon={faTags} size="2x"/>
                Gerenciar Categorias
              </button> */}
            </div>
            <div className="filter-button">
              <button className="primary-button" onClick={handleCategoriesModal}>
                <FontAwesomeIcon icon={faTags} size="2x"/>
                Gerenciar Categorias
              </button>
              <button className="primary-button">
                <FontAwesomeIcon icon={faFilter} size="2x"/>
                Filtros
              </button>
            </div>
          </div>
          {Transactions && Transactions.map(transaction => (
              <TransactionItem key={transaction._id} { ...transaction }/>
          ))}
      </ul>
    </>
  )
}

export default TransactionsList