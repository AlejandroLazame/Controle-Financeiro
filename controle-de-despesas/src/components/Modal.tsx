import { ReactNode } from 'react'
import '../components/styles/Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <section className='modal-button'>
                    <button className='close-button' onClick={onClose}> 
                        <FontAwesomeIcon icon={faXmark} size='2x'/>
                    </button>
                </section>
                {children}
            </div>
        </div>
    );
};

export default Modal;