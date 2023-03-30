import style from './modal-overlay.module.css';

const ModalOverlay = ({ onClose } : {onClose: () => void}) => {
    return (
        <div className={style.ModalOverlay} onClick={onClose}></div>
    )
};

export default ModalOverlay;