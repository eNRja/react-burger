import React from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import './ingredients-column-style.css'

export default function IngredientsColumn({ ingredients, columnTitle }) {
    const translateTitle = columnTitle === "Булки" ?
        "bun" : (columnTitle === "Соусы" ? "sauce" : "main");
    return (
        <>
            <h2 className='mt-2 mb-6 text text_type_main-medium'>{columnTitle}</h2>
            <div className='IngredientsColumn'>
                {ingredients.map(element =>
                    element.type === translateTitle &&
                        <IngredientItem element={element} key={element._id} />
                )}
            </div>
        </>
    )
}
