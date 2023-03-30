import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch } from '../../hooks/hooks';
import { requestLogout } from '../../services/actions/login';
import styles from './profile-navbar.module.css'

export function ProfileNavBar() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const isProfile = pathname === "/profile" ? `${styles.active}` : "";
    const isisProfileOrders = pathname === "/profile/orders" ? `${styles.active}` : "";
    const isHome = pathname === "/" ? `${styles.active}` : "";

    const onClickExit = () => {
        dispatch(requestLogout());
    };

    return (
        <div className={styles.ProfileNavBarMain}>
            <NavLink to={`/profile`} className={`${styles.ProfileNavBarButton} ${isProfile} text text_type_main-medium text_color_inactive`}>Профиль</NavLink>
            <NavLink to={`/profile/orders`} className={`${styles.ProfileNavBarButton} ${isisProfileOrders} text text_type_main-medium text_color_inactive`}>История заказов</NavLink>
            <NavLink to={`/`} className={`${styles.ProfileNavBarButton} ${isHome} text text_type_main-medium text_color_inactive`} onClick={onClickExit}>Выход</NavLink>
            <span className="text text_type_main-default text_color_inactive mt-20">В этом разделе вы можете
                изменить&nbsp;свои персональные данные</span>
        </div>
    )
}