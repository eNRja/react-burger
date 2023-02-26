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
    const bunTitleRef = React.createRef();
    const sauceTitleRef = React.createRef();
    const mainTitleRef = React.createRef();

    const moveToTitleBun = () => {
        bunTitleRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        setCurrent('one');
    }
    const moveToTitleSauce = () => {
        sauceTitleRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        setCurrent('two');
    }
    const moveToTitleMain = () => {
        mainTitleRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
        setCurrent('three');
    }

    React.useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);



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
                    <h2 id="idOne" className='mt-2 mb-6 text text_type_main-medium' ref={bunTitleRef}>Булки</h2>
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Булки"} setCurrent={setCurrent} />
                    <h2 id="idTwo" className='mt-2 mb-6 text text_type_main-medium' ref={sauceTitleRef}>Соусы</h2>
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Соусы"} setCurrent={setCurrent} />
                    <h2 id="idThree" className='mt-2 mb-6 text text_type_main-medium' ref={mainTitleRef}>Начинки</h2>
                    <IngredientsColumn ingredients={ingredients} columnTitle={"Начинки"} setCurrent={setCurrent} />
                </div>
            </section>
        )
    }
}