/* eslint-disable no-unused-vars */
import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminPanelDrawer from "../../Components/Panel/AdminPanel/AdminPanelDrawer";
import { withRouter } from "react-router";
class AdminPanelPage extends React.Component {
  render() {
    return (
      <div className="admin-panel-page">
        <AdminPanelDrawer></AdminPanelDrawer>
      </div>
    );
  }
}

export default withRouter(AdminPanelPage);
