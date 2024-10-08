import { useState, useEffect, ReactNode } from 'react';
import Modal from '../components/Modal';
import useFecth from './useFecth';

interface IfecthProperties {
    query: string
}

const useModal = (content: ReactNode) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return {
        isOpen: isModalOpen,
        openModal,
        closeModal
    };    
};

export default useModal;