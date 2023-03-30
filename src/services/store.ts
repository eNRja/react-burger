import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from "./middlewares/socket";
import { feedWsActions } from './actions/feed';
import { ordersWsActions } from './actions/orders';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer: any = composeEnhancers(applyMiddleware(thunk, socketMiddleware(feedWsActions), socketMiddleware(ordersWsActions)));
export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;
