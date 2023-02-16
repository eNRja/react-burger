import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css'
import AppHeaderButton from '../app-header-button/app-header-button'

export default function AppHeader() {
    return (
        <header className={style.AppHeader}>
            <div className={style.AppHeaderBlock}>
                <div className={style.AppHeaderSubBlock}>
                    <AppHeaderButton buttonIcon={BurgerIcon} buttonText="Конструктор" buttonDefault={true} />
                    <AppHeaderButton buttonIcon={ListIcon} buttonText="Лента заказов" buttonDefault={false} />
                </div>
                <AppHeaderButton buttonIcon={ProfileIcon} buttonText="Личный кабинет" buttonDefault={false} />
                <div className={style.AppHeaderLogo}>
                    <Logo />
                </div>
            </div>
        </header>
    )
}