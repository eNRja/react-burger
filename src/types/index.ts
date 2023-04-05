import { TDragActions } from '../services/actions/draggable-ingredients';
import { TResetForgotPAssActions } from '../services/actions/forgot-reset-password';
import { TGetItemsActions } from '../services/actions/ingredients';
import { TGetUserActions } from '../services/actions/login';
import { TSetIngredientsActions } from '../services/actions/order';
import { IRegistrationSuccessAction } from '../services/actions/registration';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import store from '../services/store';
import { TSetFeedIngredientsActions } from '../services/actions/feed';
import { TSetOrdersIngredientsActions } from '../services/actions/orders';
import { Action, ActionCreator } from 'redux';

export type TAppActions =
    | TDragActions
    | TResetForgotPAssActions
    | TGetItemsActions
    | TGetUserActions
    | TSetIngredientsActions
    | IRegistrationSuccessAction
    | TSetFeedIngredientsActions
    | TSetOrdersIngredientsActions


export type TAppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<
        ReturnType,
        TRootState,
        Action,
        TAppActions
    >
>;

export type TAppDispatch = ThunkDispatch<TRootState, never, TAppActions>;
export type TRootState = ReturnType<typeof store.getState>;