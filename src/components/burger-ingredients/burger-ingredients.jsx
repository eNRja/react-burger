import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsColumn from '../ingredients-column/ingredients-column';
import './burger-ingredients-style.css'

export default function BurgerIngredients({ ingredients }) {
    const [current, setCurrent] = React.useState('one')
    return (
        <>
            <section className='BurgerIngredients'>
                <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
                <div className='BurgerTable'>
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
                <div className='mt-8 IngredientColumns'>
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Булки"} />
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Соусы"} />
                </div>
            </section>
        </>
    )
}