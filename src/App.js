/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import SigninPage from "./Layout/SigninPage/SigninPage";
import AdminPanelPage from "./Layout/PanelPage/AdminPanelPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/signin">
              <SigninPage />
            </Route>
            <Route path="/panel">
              <Route path="/panel/admin">
                <AdminPanelPage />
              </Route>
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
