import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modals = document.querySelector("#modals") as HTMLElement;

const Modal = ({ onClose, children }: { onClose: () => void, children?: JSX.Element }) => {

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
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
                <button className={style.ModalEscBtn} onClick={onClose}></button>
                {children}
            </div >
            <ModalOverlay onClose={onClose} />
        </div >,
        modals
    );
};

export default Modal;