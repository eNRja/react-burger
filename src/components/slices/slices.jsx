import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './slices.module.css';

export default function Slices({ element, topBottom }) {
    let types = undefined;
    let isLockeds = false;
    let classNames = style.Slices;
    let extraClasses = "";
    let topBottomText = "";
    {
        if (element.name === "Краторная булка N-200i" && topBottom === "top") {
            extraClasses = "ml-8 mb-4";
            types = topBottom;
            classNames = "";
            topBottomText = "(верх)"
        }
    }
    {
        if (element.name === "Краторная булка N-200i" && topBottom === "bottom") {
            extraClasses = "ml-8 mt-4";
            types = topBottom;
            classNames = "";
            isLockeds = true;
            topBottomText = "(низ)"
        }
    }

    return (
        <div className={classNames}>
            {!topBottom && <DragIcon type="primary" />}
            <ConstructorElement
                type={types}
                isLocked={isLockeds}
                text={`${element.name}${' '}${topBottomText}`}
                price={element.price}
                thumbnail={element.image_mobile}
                extraClass={extraClasses}
            />
        </div>
    )
}