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
  OrdersPage,
  FeedPage
} from '../../pages';
import Modal from '../modal/modal'
import { checkAuth } from '../../services/actions/login';
import ModalContent from '../modal-content/modal-content';
import { useDispatch } from '../../hooks/hooks';
import { getIngredients } from '../../services/actions/ingredients';
import ModalFeedContent from '../modal-feed-content/modal-feed-content';
import ModalOrderContent from '../modal-order-content/modal-order-content';

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const onModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={style.App}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/modal/:ingredientId" element={<ModalContent />} />
        <Route path="/feed/:orderId" element={<ModalFeedContent />} />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute anonymous={false}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/:orderId"
          element={
            <ProtectedRoute anonymous={false}>
              <ModalOrderContent />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/feed"
          element={
            <FeedPage />
          }
        />
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes location={location}>
          <Route
            path="/modal/:ingredientId"
            element={
              <Modal onClose={onModalClose}>
                <ModalContent />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes location={location}>
          <Route
            path="/feed/:orderId"
            element={
              <Modal onClose={onModalClose}>
                <ModalFeedContent />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes location={location}>
          <Route
            path="/profile/orders/:orderId"
            element={
              <ProtectedRoute anonymous={false}>
                <Modal onClose={onModalClose}>
                  <ModalOrderContent />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}