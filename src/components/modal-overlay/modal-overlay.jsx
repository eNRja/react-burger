import React from 'react';
import style from './modal-overlay.module.css';
import PropType from "prop-types";

const ModalOverlay = ({ onClose }) => {
    return (
        <div className={style.ModalOverlay} onClick={onClose}></div>
    )
};

ModalOverlay.propTypes = {
    onClose: PropType.func.isRequired,
}

export default ModalOverlay;