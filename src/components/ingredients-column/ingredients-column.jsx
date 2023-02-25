import React from 'react';
import { useInView } from "react-intersection-observer";
import IngredientItem from '../ingredient-item/ingredient-item';
import style from './ingredients-column.module.css';
import { ingredientPropType } from '../utils/prop-types';
import PropType from "prop-types";

export default function IngredientsColumn({ ingredients, columnTitle, setCurrent }) {
    const translateTitle = columnTitle === "Булки" ?
        "bun" : (columnTitle === "Соусы" ? "sauce" : "main");

    const idTitle = columnTitle === "Булки" ?
        "idOne" : (columnTitle === "Соусы" ? "idTwo" : "idThree");

    const [mainRef, mainInView] = useInView({
        threshold: 0
    });

    columnTitle === "Начинки" && React.useEffect(() => {
        mainInView === false && setCurrent("two");
        mainInView === true && setCurrent("three");
    }, [mainInView]);

    return (
        <>
            <h2 id={idTitle} className='mt-2 mb-6 text text_type_main-medium'>{columnTitle}</h2>
            <ul className={style.IngredientsColumn} ref={mainRef}>
                {ingredients.map(element =>
                    element.type === translateTitle &&
                    <IngredientItem element={element} key={element._id} setCurrent={setCurrent} />
                )}
            </ul>
        </>
    )
}

IngredientsColumn.propTypes = {
    ingredients: PropType.arrayOf(ingredientPropType).isRequired,
    columnTitle: PropType.string.isRequired,
    setCurrent: PropType.func.isRequired,
}