import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {

  return (
    <div className={styles.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        < main className={styles.AppCards}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div >
  );
}