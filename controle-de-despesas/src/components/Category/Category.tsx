import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/Category.css';

import { useModal } from "../../contexts/Modal.context";

import Modal from "../Modal/Modal";
import ManageCategory, {ManageActionType} from "./ManageCategory";

export interface ICategory {
    _id: string,
    name: string
}
export const Category: React.FC<ICategory> = ({_id, name}) => {
    const { openModal } = useModal();
    const handleEditCategoriesModal = () => {
        openModal(<Modal><ManageCategory type={ManageActionType.edit} _id={_id} /></Modal>)
    }

    return (
        <li key= {_id} className="category">
            <div className="category-content">
                <input type="checkbox" />
                <p className="category-name">{name}</p>
            </div>
            <div className="edit-icon" >
                < FontAwesomeIcon icon={faPen} onClick={handleEditCategoriesModal}/>
            </div>
        </li>
    )
}

export default Category