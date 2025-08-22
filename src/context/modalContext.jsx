import React, { createContext, useState } from "react";
import Modal from '../components/modal/Modal.jsx';
import ModalClose from '../components/modal/ModalClose.jsx';
import ModalConfirm from '../components/modal/ModalConfirm.jsx';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    // Use state to keep track of which modal is open; null means no modal open
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState(null);

    // Open a modal by setting the modal name; only one modal can be open
    const openModal = (modalType, data) => {
        setModalType(modalType);
        setModalData(data);
    };

    // Close the modal by setting currentModal to null
    const closeModal = () => {
        setModalType(null);
        setModalData(null);
    };

    // Boolean to check if any modal is open
    const isModalOpen = () => {
        return modalType !== null;
    }

  return (
    <ModalContext.Provider
        value={{ openModal, closeModal, isModalOpen }}
    >
        {modalData && modalType == "modal" && (
            <Modal
                title={modalData.title}
                content={modalData.content}
                onClose={closeModal}
            />
        )}
        {modalData && modalType == "modal_close" && (
            <ModalClose
                title={modalData.title}
                content={modalData.content}
                onClose={closeModal}
            />
        )}
        {modalData && modalType == "modal_confirm" && (
            <ModalConfirm
                title={modalData.title}
                content={modalData.content}
                onConfirm={modalData.onConfirm}
                onClose={closeModal}
            />
        )}
        

        {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };
