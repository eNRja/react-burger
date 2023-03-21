import style from './ingredient-details.module.css';
import { IIngredient } from '../../utils/data';

const IngredientDetails = ({element}: IIngredient) => {
const {calories, carbohydrates, fat, image_large, name, proteins} = element;

    return (
        <div className={style.ModalIngredientDetails}>
            <img src={image_large} alt={name}></img>
            <h2 className="text text_type_main-medium mt-4 mb-8">{name}</h2>
            <div className={style.ModalIngredientOptions}>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                </div>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                </div>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                </div>
                <div className={style.ModalIngredientOption}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                </div>
            </div>
            
        </div>
    )
};

export default IngredientDetails;