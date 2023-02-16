import React from 'react';
import style from './burger-components.module.css';
import Slices from '../slices/slices';

export default function BurgerComponents({ ingredients }) {
    return (
        <div className={style.BurgerComponents}>
            {ingredients.map(element =>
                element.name === 'Краторная булка N-200i' &&
                <Slices element={element} key={element._id} topBottom="top" />
            )}
            <div className={style.BurgerCenter}>
                {ingredients.map(element =>
                    element.type !== 'bun' &&
                    <Slices element={element} key={element._id} />
                )}
            </div>
            {ingredients.map(element =>
                element.name === 'Краторная булка N-200i' &&
                <Slices element={element} key={element._id} topBottom="bottom" />
            )}
        </div>
    )
}