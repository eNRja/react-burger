import React from 'react';
import { useInView } from "react-intersection-observer";
import IngredientItem from '../ingredient-item/ingredient-item';
import style from './ingredients-column.module.css';
import { ingredientPropType } from '../../utils/prop-types';
import PropType from "prop-types";

const IngredientsColumn = ({ ingredients, columnTitle, setCurrent }) => {
    const translateTitle = columnTitle === "Булки" ?
        "bun" : (columnTitle === "Соусы" ? "sauce" : "main");

    const [mainRef, mainInView] = useInView({
        threshold: 0
    });

    React.useEffect(() => {
        columnTitle === "Начинки" && mainInView === false && setCurrent("two");
        columnTitle === "Начинки" && mainInView === true && setCurrent("three");
    }, [mainInView]);

    return (
        <ul className={style.IngredientsColumn} ref={mainRef}>
            {ingredients.map(element =>
                element.type === translateTitle &&
                <IngredientItem element={element} key={element._id} setCurrent={setCurrent} />
            )}
        </ul>
    )
}

IngredientsColumn.propTypes = {
    ingredients: PropType.arrayOf(ingredientPropType).isRequired,
    columnTitle: PropType.string.isRequired,
    setCurrent: PropType.func.isRequired,
}

export default IngredientsColumn;