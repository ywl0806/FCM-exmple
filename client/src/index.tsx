import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initFirebase } from "./firebaseInit";
import "./index.css";
import "./broadcast";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

initFirebase();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
