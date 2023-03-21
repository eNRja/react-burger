import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

// export default function ProtectedRoute({ anonymous, isUser, children } : {anonymous: boolean, isUser: boolean, children: JSX.Element}) {
//     const isAuthChecked = useAppSelector((state) => state.login);
//     const isLoggedIn = !!useAppSelector((state) => state.login);

//     if (!isAuthChecked) {
//         return <h1>Загрузка...</h1>;
//     }

//     if (anonymous && isLoggedIn && !isUser) {
//         return <Navigate to="/login" />;
//     }

//     if (!anonymous && !isLoggedIn) {
//         return <Navigate to="/login" />;
//     }

//     if (!anonymous && isLoggedIn && isUser) {
//         return <Navigate to="/profile" />;
//     }

//     return <>{children}</>;
// }
export default function ProtectedRoute({ children, anonymous = false }:{ children: JSX.Element, anonymous: boolean }) {
    const isAuthChecked = useAppSelector((state) => state.login);
    const isLoggedIn = useAppSelector((state) => state.login);
    const location = useLocation();
    const from = location.state?.from || '/';

    if (!isAuthChecked) {
        return <h1>Загрузка...</h1>;
    }

    // Если разрешен неавторизованный доступ, а пользователь авторизован...
    if (anonymous && isLoggedIn.user !== null) {
        // ...то отправляем его на предыдущую страницу
        return <Navigate to={from} />;
    }

    // Если требуется авторизация, а пользователь не авторизован...
    if (!anonymous && isLoggedIn.user === null) {
        // ...то отправляем его на страницу логин
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Если все ок, то рендерим внутреннее содержимое
    return children;
}