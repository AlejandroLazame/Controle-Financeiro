import { createContext, ReactNode, useContext, useState } from "react";
import Modal from "../components/Modal/Modal";

interface IModalContext {
    modalContent: ReactNode | null;
    openModal: (content: ReactNode | null) => void;
    closeModal: () => void;
}


const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModal = (): IModalContext => {
    const context = useContext(ModalContext);
    if(!context) {
        throw new Error("useModal deve ser usado dentro do ModalProvider");
    }

    return context;
};

interface IModalProvider {
    children: ReactNode;
}

export const ModalProvider: React.FC<IModalProvider> = ({children}) => {
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);

    const openModal= (content: ReactNode) => 
        setModalContent(content);
    const closeModal = () => 
        setModalContent(null);

    return (
        <ModalContext.Provider value={{ modalContent, openModal, closeModal}}>
            {children}
            {modalContent && <Modal>{modalContent}</Modal>}
        </ModalContext.Provider>
    )
}