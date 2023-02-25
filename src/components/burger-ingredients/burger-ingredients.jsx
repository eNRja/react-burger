import React from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsColumn from '../ingredients-column/ingredients-column';
import style from './burger-ingredients.module.css';

export default function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredient);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    } else {
        return (
            <section className={style.BurgerIngredients} >
                <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
                <nav className={style.BurgerTable}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent && moveOne}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent && moveTwo}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent && moveThree}>
                        Начинки
                    </Tab>
                </nav>
                <div className={style.IngredientColumns} >
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Булки"} setCurrent={setCurrent} />
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Соусы"} setCurrent={setCurrent} />
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Начинки"} setCurrent={setCurrent} />
                </div>
            </section>
        )
    }
}

const moveOne = () => {
    return location.href = "#idOne"
}
const moveTwo = () => {
    return location.href = "#idTwo"
}
const moveThree = () => {
    return location.href = "#idThree"
}