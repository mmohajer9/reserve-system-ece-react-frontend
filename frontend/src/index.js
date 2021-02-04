import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux"
import reducer from "./Reducers"
// import "../node_modules/vazir-font/dist/Farsi-Digits-Without-Latin/font-face-FD-WOL.css" //? Vazir FD WOL
// import "../node_modules/vazir-font/dist/font-face.css" //? Vazir
// import "../node_modules/vazir-font/dist/Farsi-Digits/font-face-FD.css" //? Vazir FD
// import "../node_modules/vazir-font/dist/Without-Latin/font-face-WOL.css" //? Vazir WOL
// import "../node_modules/vazir-font-farsi-number/dist/font-face.css"
const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
