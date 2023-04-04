import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from "./middlewares/socket";
import { feedWsActions } from './actions/feed';
import { ordersWsActions } from './actions/orders';
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk,
        socketMiddleware(feedWsActions),
        socketMiddleware(ordersWsActions))),
        );

export default store;