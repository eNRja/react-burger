import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

import AppHeaderButton from '../app-header-button/app-header-button';

export default function AppHeader() {
    const { pathname } = useLocation();
    const isIndex = pathname === "/";
    const isLogin = pathname === "/login";
    const isProfile = pathname === "/profile";
    const isRegister = pathname === "/register";
    const isResetPass = pathname === "/reset-password";
    const isOrder = pathname === "/profile/orders"

    return (
        <header className={style.AppHeader}>
            <div className={style.AppHeaderBlock}>
                <div className={style.AppHeaderSubBlock}>
                    <NavLink to="/" className={style.active}>
                        <AppHeaderButton buttonIcon={BurgerIcon} buttonText="Конструктор" buttonDefault={isIndex} />
                    </NavLink>
                    <NavLink to="profile/orders" className={style.active}>
                        <AppHeaderButton buttonIcon={ListIcon} buttonText="Лента заказов" buttonDefault={isOrder} />
                    </NavLink>
                </div>
                <NavLink to="/profile" className={style.active}>
                    <AppHeaderButton buttonIcon={ProfileIcon} buttonText="Личный кабинет" buttonDefault={isLogin || isProfile || isRegister || isResetPass} />
                </NavLink>
                <NavLink to="/" className={style.AppHeaderLogo}>
                    <Logo />
                </NavLink>
            </div>
        </header>
    )
}