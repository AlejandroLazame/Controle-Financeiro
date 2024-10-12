import useFecth from "../../hooks/useFecth";
import { useModal } from "../../contexts/Modal.context";
import { MouseEventHandler, useEffect, useState } from "react";


import { ICategory, Category } from "./Category";
import Modal from "../Modal/Modal";
import ManageCategory, { ManageActionType } from "./ManageCategory";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/CategoriesList.css';


const CategoriesList = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const { openModal } = useModal();

    const handleNewCategoryModal: MouseEventHandler = () => {
        openModal(<Modal><ManageCategory type={ ManageActionType.new } _id=""/></Modal>)
    }

    const query=`
        query {
            listCategories {
                _id
                name
            }
        }
    `;

    const {data, loading, error} = useFecth(query);

    useEffect(()=>{
        if(data){
            setCategories(data.listCategories);
        }
    },[data]);

    

    return (
        <>
            <header className="categories-header">
                <button className="new-category primary" onClick={handleNewCategoryModal}>
                    <FontAwesomeIcon icon={faTags} size="2x"/>
                    <p>Nova Categoria</p>
                </button>
                <button className="delete-categories danger">
                    <FontAwesomeIcon icon={faTrash} size="2x"/>
                    <p>Excluir Selecionadas</p>
                </button>
            </header>
            <ul className="categories-list">
                {categories && categories.map((category)=>(
                    <Category key={category._id} _id={category._id} name={category.name}/>
                ))}
            </ul>
        </>
    )
}

export default CategoriesList