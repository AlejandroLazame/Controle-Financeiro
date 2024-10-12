import '../styles/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../contexts/Modal.context'; 
import { ReactNode } from 'react';

interface IModalProps {
    children: ReactNode
}

const Modal: React.FC<IModalProps> = ({ children }) => {
    const { closeModal } = useModal();
        
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <section className='modal-button'>
                    <button className='close-button' onClick={closeModal}> 
                        <FontAwesomeIcon icon={faXmark} size='2x'/>
                    </button>
                </section>
                {children}
            </div>
        </div>
    );
};

export default Modal;