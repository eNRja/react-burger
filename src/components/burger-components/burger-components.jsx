import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-components-style.css';
import Slices from '../slices/slices';

export default function BurgerComponents({ ingredients }) {
    console.log(ingredients)
    return (
        <>
            <div className='BurgerComponents'>
                {ingredients.map(element =>
                    element.name === 'Краторная булка N-200i' &&
                    <Slices element={element} key={element._id} topBottom="top" />
                )}
                <div className='BurgerCenter'>
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
        </>
    )
}