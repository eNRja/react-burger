import React from 'react';
import style from './app-header-button.module.css'

export default function AppHeaderButton(props) {
    const Form = props.buttonIcon;
    const buttonType = props.buttonDefault === false ? "secondary" : "primary";
    const buttonText = props.buttonDefault === false ? "text_color_inactive" : "";

    return (
        <a className={style.Button}>
            <Form type={buttonType} />
            <span className={`text text_type_main-default ml-2 ${buttonText}`}>
                {props.buttonText}
            </span>
        </a>
    )
}