import React from 'react';
import './modal-order-details-style.css'

const ModalOrderDetails = () => {
    return (
        <div className='ModalOrderDetails'>
            <h2 className="ModalOrderTitle text text_type_digits-large">034536</h2>
            <span className="text text_type_main-medium mt-8">идентификатор заказа</span>
            <div className='ModalOrderImg'></div>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="ModalOrderText text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
};

export default ModalOrderDetails;