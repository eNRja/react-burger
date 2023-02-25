import React from 'react';
import BurgerComponents from '../burger-components/burger-components';
import BurgerInfo from '../burger-info/burger-info';
import style from './burger-constructor.module.css';


export default function BurgerConstructor() {
    return (
        <section className={style.ConsructorColumns}>
            <BurgerComponents />
            <BurgerInfo />
        </section>
    )
}