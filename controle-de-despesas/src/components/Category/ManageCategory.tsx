import { useModal } from "../../contexts/Modal.context"
import useFetch from "../../hooks/useFecth";

import Modal from "../Modal/Modal";
import CategoriesList from "./CategoriesList";

import '../styles/ManageCategory.css';
import { MouseEventHandler, useEffect, useState } from "react";


export enum ManageActionType {
    new = 'new',
    edit = 'edit'
}

interface INewCategory {
    NewCategory: {
        name: string
    }
}

interface IUpdateCategory {
    UpdateCategory: {
        _id: string,
        data: {
            name: string
        }
    }
}

const mutationNewCategory = `
    mutation addNewCategory ($NewCategory: newCategoryInput!){
        addNewCategory(input: $NewCategory) {
            _id
            name
        }
    }
`;

const mutationUpdateCategory = `
    mutation updateCategory ($UpdateCategory: updateCategoryInput!){
        updateCategory(input: $UpdateCategory)
    }
`;


const ManageCategory: React.FC<{type: ManageActionType, _id: string}> = ({type, _id}) => {
    const { openModal } = useModal();
    const [mutation, setMutation] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [variables, setVariables] = useState<INewCategory | IUpdateCategory>();
    const { data, loading, error } = useFetch(mutation, variables);

    const handleCategoriesModal: MouseEventHandler = () => {
        openModal(<Modal><CategoriesList /></Modal>);
    };
    
    const handleSaveCategory: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        let mutation, variables;
        if(type === ManageActionType.new){
            mutation = mutationNewCategory;
            variables = {NewCategory: { name: categoryName}};
        } else {
            mutation = mutationUpdateCategory;
            variables = {UpdateCategory: {_id: _id, data: { name: categoryName}}}
        }
        setMutation(mutation!);
        setVariables(variables);
    }

    useEffect(()=> {
        if( data ) {
            console.log('Categoria Salva:', data);
            openModal(<Modal><CategoriesList /></Modal>)
        }
    })

    return (
        <div className="manage-category">
            <header className="category-header">
                {type === ManageActionType.new ?
                    <>
                        <h4 className="header-title">Nova Categoria</h4>
                        <small className="header-description">Preencha os campos abaixo para cadastrar uma nova categoria.</small>
                    </>
                : type === ManageActionType.edit ?  
                    <>
                        <h4 className="header-title">Editar Categoria</h4>
                        <small className="header-description">Preencha os campos abaixo para editar a categoria.</small>
                    </>
                : null
                }
            </header>
            <form className="form-manage-category">
                <label htmlFor="#">
                    <h4 className="category-name">Nome da Categoria</h4>
                    <input type="text" className="category-name-input" id="category-name-input" onChange={(e)=> setCategoryName(e.target.value)}/>
                </label>
            </form>
            <div className="action-buttons">
                <button type= "button" className="return-button danger" onClick={handleCategoriesModal}>
                    Voltar
                </button>
                <button type= "button" className="save-button success" onClick={handleSaveCategory}>
                    Salvar
                </button>
            </div>
            {loading && <p>Salvando...</p>}
            {error && <p>Erro: {error}</p>}
        </div>
    )
}

export default ManageCategory;