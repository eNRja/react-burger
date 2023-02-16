import React from 'react';
import style from './modal-overlay.module.css';

const ModalOverlay = ({ onClose }) => {
    return (
        <div className={style.ModalOverlay} onClick={onClose}></div>
    )
};

export default ModalOverlay;