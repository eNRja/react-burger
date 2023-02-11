import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css'
import ModalOrderDetails from '../modal-order-details/modal-order-details'
import ModalIngredientDetails from '../modal-ingredient-details/modal-ingredient-details'

const modals = document.querySelector("#modals");

const Modal = ({ onClose, order, element }) => {
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
                        {order && ""}
                        {element && "Детали ингредиента"}
                    </h1>
                    <button className={style.ModalEscBtn} onClick={onClose}></button>
                </div>
                {order && <ModalOrderDetails />}
                {element && <ModalIngredientDetails element={element} />}
            </div >
            <div className={style.Overlay} onClick={onClose}></div>
        </div >,
        modals
    );
};

export default Modal;