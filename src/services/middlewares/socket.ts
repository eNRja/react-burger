import { Middleware } from "redux";
import { TRootState } from "../../types";
import { TFeedWsActions } from "../actions/feed";
import { TOrdersWsActions } from "../actions/orders";

export const socketMiddleware = (wsActions: TFeedWsActions | TOrdersWsActions): Middleware<{}, TRootState> => (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;

    if (action.type === wsActions.init) {
      socket = new WebSocket(action.payload);
    }

    if (socket) {
      socket.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        dispatch({
          type: wsActions.message,
          payload: parsed
        });
      };

      if (action.type === wsActions.close) {
        console.log("Socked closed");
        socket.close();
      }
    }

    return next(action);
  };
};
