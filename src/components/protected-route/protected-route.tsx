import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/hooks";
import { checkAuth } from "../../services/actions/login";

export default function ProtectedRoute({ children, anonymous = false }: { children: JSX.Element, anonymous: boolean }) {
    const { user } = useSelector((state) => state.login);
    const location = useLocation();
    const from = location.state?.from || '/';
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    if (anonymous && user !== null) {
        return <Navigate to={from} />;
    }

    if (!anonymous && user === null) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}