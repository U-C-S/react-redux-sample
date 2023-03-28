import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { bucketStore } from "./utils/bucketStore";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={bucketStore}>
    <App />
  </Provider>
);
