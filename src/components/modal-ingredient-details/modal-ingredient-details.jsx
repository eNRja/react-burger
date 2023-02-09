import React from 'react';
import './modal-ingredient-details-style.css'

const ModalIngredientDetails = ({element}) => {
    console.log(element)
    return (
        <div className='ModalIngredientDetails'>
            <img src={element.image_large} alt={element.name}></img>
            <h2 className="text text_type_main-medium mt-4 mb-8">{element.name}</h2>
            <div className='ModalIngredientOptions'>
                <div className='ModalIngredientOption'>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.calories}</p>
                </div>
                <div className='ModalIngredientOption'>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.proteins}</p>
                </div>
                <div className='ModalIngredientOption'>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.fat}</p>
                </div>
                <div className='ModalIngredientOption'>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{element.carbohydrates}</p>
                </div>
            </div>
            
        </div>
    )
};

export default ModalIngredientDetails;