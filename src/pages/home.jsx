import styles from './home.module.css';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function HomePage() {

    return (
        <div className={styles.Home}>
            <DndProvider backend={HTML5Backend}>
                < main className={styles.HomeCards}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </div >
    )
}