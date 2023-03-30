import { TDragActions } from '../services/actions/draggable-ingredients';
import { TResetForgotPAssActions } from '../services/actions/forgot-reset-password';
import { TGetItemsActions } from '../services/actions/ingredients';
import { TGetUserActions } from '../services/actions/login';
import { TSetIngredientsActions } from '../services/actions/order';
import { IRegistrationSuccessAction } from '../services/actions/registration';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import store from '../services/store';

export type TRootState = ReturnType<typeof store.getState>;

export type TAppActions = TDragActions
    | TResetForgotPAssActions
    | TGetItemsActions
    | TGetUserActions
    | TSetIngredientsActions
    | IRegistrationSuccessAction


export type TAppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    TRootState,
    unknown,
    TAppActions
>;

export type TAppDispatch = ThunkDispatch<TRootState, never, TAppActions>;