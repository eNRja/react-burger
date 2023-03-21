import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route/protected-route';
import style from './app.module.css';
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForogotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  OrdersPage
} from '../../pages';
import Modal from '../modal/modal'
import { checkAuth } from '../../services/actions/login';
import ModalContent from '../modal-content/modal-content';
import { useAppDispatch } from '../../hooks/hooks';

export default function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const onModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={style.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/modal/:ingredientId" element={<ModalContent />} />
        <Route path="/profile/orders" element={<OrdersPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute anonymous={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={true}>
              <ForogotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes location={location}>
          <Route
            path="/modal/:ingredientId"
            element={
              <Modal onClose={onModalClose} titleModal="Детали ингредиента">
                <ModalContent />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}