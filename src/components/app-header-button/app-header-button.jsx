import React from 'react';
import style from './app-header-button.module.css'

export default function AppHeaderButton(props) {
    const ButtonIcon = props.buttonIcon;
    const buttonType = props.buttonDefault === false ? "secondary" : "primary";
    const buttonText = props.buttonDefault === false ? "text_color_inactive" : "";

    return (
        <a className={style.Button}>
            <ButtonIcon type={buttonType} />
            <span className={`text text_type_main-default ml-2 ${buttonText}`}>
                {props.buttonText}
            </span>
        </a>
    )
}