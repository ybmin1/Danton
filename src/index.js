import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import rootReducer from "./store/modules";
import { createStore } from "redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
