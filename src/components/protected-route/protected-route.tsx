import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../hooks/hooks";

export default function ProtectedRoute({ children, anonymous = false }: { children: JSX.Element, anonymous: boolean }) {
    const { user } = useSelector((state) => state.login);
    const location = useLocation();
    const from = location.state?.from || '/';

    if (anonymous && user !== null) {
        return <Navigate to={from} />;
    }

    if (!anonymous && user === null) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}