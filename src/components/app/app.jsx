import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route/protected-route';
import styles from './app.module.css';
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

export default function App() {
  const { user } = useSelector(state => state.login);
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/modal/:ingredientId" element={<ModalContent />} />
        <Route path="/profile/orders" element={<OrdersPage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous={user === null} isUser={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute anonymous={user === null}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous={user === null} isUser={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute anonymous={user === null} isUser={true}>
              <ForogotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute anonymous={user === null} isUser={true}>
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