import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import { rootReducer } from "./redux/reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
