import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../utils/api';

export default function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients()
      .then((data) => setIngredients(...ingredients, data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className={styles.App}>
        <AppHeader />
        {ingredients.length !== 0 &&
          < main className={styles.AppCards}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </main>
        }
    </div >
  );
}