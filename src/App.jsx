import React from 'react';
import styles from './app.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import { getIngredients } from './components/utils/api'

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients()
      .then((data) => setIngredients(...ingredients, data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className={styles.App}>
      <>
        <AppHeader />
        {ingredients.length !== 0 &&
          < main className={styles.AppCards}>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </main>
        }
      </>
    </div >
  );
}

export default App;