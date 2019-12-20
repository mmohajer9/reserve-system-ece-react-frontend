/* eslint-disable no-unused-vars */
import React from "react";
import { CssBaseline, Container, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminPanelDrawer from "../../Components/Panel/AdminPanel/AdminPanelDrawer";
import { withRouter } from "react-router";

function Copyright() {
  return (
    <Typography style={{margin : "3em"}} variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" target="_blank" href="https://mamad.me/">
        <strong>Mohammad Mahdi Mohajer</strong>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class AdminPanelPage extends React.Component {
  render() {
    return (
      <div className="admin-panel-page">
        <AdminPanelDrawer></AdminPanelDrawer>
        <Copyright />
      </div>
    );
  }
}

export default withRouter(AdminPanelPage);
