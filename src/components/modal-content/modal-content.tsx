import { useParams } from "react-router-dom";
import "./modal-content.module.css";
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export default function ModalContent() {
  const dispatch = useAppDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useAppSelector(state => state.ingredient);
  const { ingredientId } = useParams();
  const findElement = ingredients && ingredients.find(function (elem: { _id: string | undefined; }) {
    return elem._id === ingredientId;
  })

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