import React from 'react';
import BurgerComponents from '../burger-components/burger-components';
import BurgerInfo from '../burger-info/burger-info';
import './burger-constructor-style.css'

export default function BurgerConstructor({ingredients}) {
    return (
        <>
            <section className="ConsructorColumns">
                <BurgerComponents ingredients={ingredients}/>
                <BurgerInfo />
            </section>
        </>
    )
}