import React from 'react';
import BurgerComponents from '../burger-components/burger-components';
import BurgerInfo from '../burger-info/burger-info';
import style from './burger-constructor.module.css';
import { ingredientPropType } from '../utils/prop-types';
import PropType from "prop-types";

export default function BurgerConstructor({ ingredients }) {
    return (
        <section className={style.ConsructorColumns}>
            <BurgerComponents ingredients={ingredients} />
            <BurgerInfo />
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropType.arrayOf(ingredientPropType).isRequired
}