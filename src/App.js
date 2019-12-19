import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import SigninPage from "./Layout/SigninPage/SigninPage";

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
