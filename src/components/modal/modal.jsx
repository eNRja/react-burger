import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropType from "prop-types";


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
            <ModalOverlay onClose={onClose} />
        </div >,
        modals
    );
};

Modal.propTypes = {
    order: PropType.bool.isRequired,
    onClose: PropType.func.isRequired,
    element: PropType.shape({
        __v: PropType.number.isRequired,
        _id: PropType.string.isRequired,
        calories: PropType.number.isRequired,
        carbohydrates: PropType.number.isRequired,
        fat: PropType.number.isRequired,
        image: PropType.string.isRequired,
        image_large: PropType.string.isRequired,
        image_mobile: PropType.string.isRequired,
        name: PropType.string.isRequired,
        price: PropType.number.isRequired,
        proteins: PropType.number.isRequired,
        type: PropType.string.isRequired,
    })
}

export default Modal;