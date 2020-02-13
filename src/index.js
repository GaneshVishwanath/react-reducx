import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./store/reducers";
import thunk from "redux-thunk";
//Remove Redux-Logger From Production
import { createLogger } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "app",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const myLogger = createLogger();

let myMiddleware = applyMiddleware();
if (process.env.NODE_ENV !== "production") {
  myMiddleware = applyMiddleware(thunk, myLogger);
} else {
  myMiddleware = applyMiddleware(thunk);
}
let store = createStore(persistedReducer, myMiddleware);

export const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
