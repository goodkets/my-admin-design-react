import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "antd/dist/reset.css";
import store from "./store";
import { Provider } from "react-redux";
import "virtual:svg-icons-register";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
