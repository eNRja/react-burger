import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModalOverlay from '../modal-overlay/modal-overlay';

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
                {order && <OrderDetails />}
                {element && <IngredientDetails element={element} />}
            </div >
            <ModalOverlay onClose={onClose}/>
        </div >,
        modals
    );
};

export default Modal;