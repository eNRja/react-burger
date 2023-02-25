import React from 'react';
import style from './ingredient-details.module.css';
import PropType from "prop-types";

const IngredientDetails = ({element}) => {
    return (
        <div className={style.ModalIngredientDetails}>
            <img src={element.image_large} alt={element.name}></img>
            <h2 className="text text_type_main-medium mt-4 mb-8">{element.name}</h2>
            <div className={style.ModalIngredientOptions}>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.calories}</p>
                </div>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.proteins}</p>
                </div>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.fat}</p>
                </div>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.carbohydrates}</p>
                </div>
            </div>
            
        </div>
    )
};

IngredientDetails.propTypes = {
    element: PropType.shape({
        __v: PropType.number.isRequired,
        _id: PropType.string.isRequired,
        calories: PropType.number.isRequired,
        carbohydrates: PropType.number.isRequired,
        fat: PropType.number.isRequired,
        image: PropType.string.isRequired,
        image_large: PropType.string.isRequired,
        image_mobile: PropType.string.isRequired,
        name: PropType.string.isRequired,
        price: PropType.number.isRequired,
        proteins: PropType.number.isRequired,
        type: PropType.string.isRequired,
    })
}

export default IngredientDetails;