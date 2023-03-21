import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch