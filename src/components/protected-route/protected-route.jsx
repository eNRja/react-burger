import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ anonymous, isUser, children }) {
    const isAuthChecked = useSelector((state) => state.login);
    const isLoggedIn = !!useSelector((state) => state.login);

    if (!isAuthChecked) {
        return <h1>Загрузка...</h1>;
    }

    if (anonymous && isLoggedIn && !isUser) {
        return <Navigate to="/login" />;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!anonymous && isLoggedIn && isUser) {
        return <Navigate to="/profile" />;
    }

    return <>{children}</>;
}
