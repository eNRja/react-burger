import React from 'react';
import style from './modal-order-details.module.css'

const ModalOrderDetails = () => {
    return (
        <div className={style.ModalOrderDetails}>
            <h2 className={`${style.ModalOrderTitle} text text_type_digits-large`}>034536</h2>
            <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
            <div className={style.ModalOrderImg}></div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className={`${style.ModalOrderText} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
};

export default ModalOrderDetails;