import { useParams } from "react-router-dom";
import "./modal-content.module.css";
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useSelector } from '../../hooks/hooks';

export default function ModalContent() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredient);
  const { ingredientId } = useParams();

  const element = ingredients.find(elem => {
    return elem._id === ingredientId;
  })

  if (ingredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>
  } else if (ingredientsRequest) {
    return <p>Загрузка...</p>
  } else {
    return (
      <>
        {element && <IngredientDetails element={element} />}
      </>
    )
  }
}