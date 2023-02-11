import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsColumn from '../ingredients-column/ingredients-column';
import style from './burger-ingredients.module.css';
import { ingredientPropType } from '../utils/prop-types';
import PropType from "prop-types";

export default function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = React.useState('one')
    return (
        <section className={style.BurgerIngredients}>
            <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
            <div className={style.BurgerTable}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={style.IngredientColumns}>
                <IngredientsColumn ingredients={ingredients} columnTitle={"Булки"} />
                <IngredientsColumn ingredients={ingredients} columnTitle={"Соусы"} />
                <IngredientsColumn ingredients={ingredients} columnTitle={"Начинки"} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropType.arrayOf(ingredientPropType).isRequired
}