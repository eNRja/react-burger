import { useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsColumn from '../ingredients-column/ingredients-column';
import style from './burger-ingredients.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export default function BurgerIngredients() {
    const [current, setCurrent] = useState<string>('one')
    const { ingredients, ingredientsRequest, ingredientsFailed } = useAppSelector(state => state.ingredient);

    const dispatch = useAppDispatch();
    const bunTabRef = useRef<HTMLHeadingElement>(null!);
    const sauceTabRef = useRef<HTMLHeadingElement>(null!);
    const mainTabRef = useRef<HTMLHeadingElement>(null!);

    const moveToTitleBun = () => {
        bunTabRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        setCurrent('one');
    }
    const moveToTitleSauce = () => {
        sauceTabRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        setCurrent('two');
    }
    const moveToTitleMain = () => {
        mainTabRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        setCurrent('three');
    }

    if (ingredientsFailed) {
        return <p>Произошла ошибка при получении данных</p>
    } else if (ingredientsRequest) {
        return <p>Загрузка...</p>
    } else {
        return (
            <section className={style.BurgerIngredients} >
                <h1 className='mt-10 mb-5 text text_type_main-large'>Соберите бургер</h1>
                <nav className={style.BurgerTable}>
                    <Tab value="one" active={current === 'one'} onClick={moveToTitleBun} >
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={moveToTitleSauce}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={moveToTitleMain}>
                        Начинки
                    </Tab>
                </nav>
                <div className={style.IngredientColumns}>
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Булки"} setCurrent={setCurrent} tabRef={bunTabRef} />
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Соусы"} setCurrent={setCurrent} tabRef={sauceTabRef} />
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Начинки"} setCurrent={setCurrent} tabRef={mainTabRef} />
                </div>
            </section>
        )
    }
}