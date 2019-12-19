import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import SigninPage from "./Layout/SigninPage/SigninPage";
import "../node_modules/vazir-font-farsi-number/dist/font-face.css"

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <SigninPage />
      </div>
    </>
  );
}

export default App;
