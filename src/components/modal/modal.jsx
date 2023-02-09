import React from 'react';
import ReactDOM from 'react-dom';
import './modal-style.css'
import ModalOrder from '../modal-order-details/modal-order-details'
import ModalIngredient from '../modal-ingredient-details/modal-ingredient-details'

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
        <div className="Modal">
            <div className='ModalBlock'>
                <div className='ModalHeader'>
                    <h1 className='ModalTitle text text_type_main-large'>
                        { order && "" }
                        { element && "Детали ингредиента" }
                        </h1>
                    <button className='ModalEscBtn' onClick={onClose}></button>
                </div>
            { order && <ModalOrderDetails />}
            { element && <ModalIngredientDetails element={element} />}
            </div>
            <div className='Overlay' onClick={onClose}></div>
        </div>,
        modals
    );
};

export default Modal;