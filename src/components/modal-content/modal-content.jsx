import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import "./modal-content.module.css";
import { getIngredients } from '../../services/actions/ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details'

export default function ModalContent() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredient);
  const { ingredientId } = useParams();
  const findElement = ingredients && ingredients.find(function (elem) {
    return elem._id === ingredientId;
  })

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  if (ingredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>
  } else if (ingredientsRequest) {
    return <p>Загрузка...</p>
  } else {
    return (
      <>
        {findElement && <IngredientDetails element={findElement} />}
      </>
    )
  }
}