import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropType from "prop-types";

const modals = document.querySelector("#modals");

const Modal = ({ onClose, titleModal, children }) => {

    React.useEffect(() => {
        const handleEsc = (event) => {
            event.key === "Escape" && onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        }
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className={style.Modal}>
            <div className={style.ModalBlock}>
                <div className={style.ModalHeader}>
                    <h1 className={`${style.ModalTitle} text text_type_main-large`}>
                        {titleModal}
                    </h1>
                    <button className={style.ModalEscBtn} onClick={onClose}></button>
                </div>
                {children}
            </div >
            <ModalOverlay onClose={onClose} />
        </div >,
        modals
    );
};

Modal.propTypes = {
    titleModal: PropType.string,
    onClose: PropType.func,
    children: PropType.element
}

export default Modal;