import { Middleware } from "redux";

export type TWsActions = {
  init: string;
  closed: string;
  error: string;
  close: string;
  message: string;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;

    if (action.type === wsActions.init) {
      socket = new WebSocket(action.payload);
    }

    if (socket) {
      socket.onerror = event => {
        dispatch({
          type: wsActions.error,
          payload: event.type
        });
      };
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
