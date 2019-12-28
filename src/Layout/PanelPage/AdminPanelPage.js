/* eslint-disable no-unused-vars */
import React from "react";
import { CssBaseline, Container, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminPanelDrawer from "../../Components/Panel/AdminPanel/AdminPanelDrawer";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { setUniversity, setDepartment, setAdmin, setUserInfo } from "../../Actions";

function Copyright() {
  return (
    <Typography
      style={{ margin: "3em" }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
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
  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      if (userInfo.login_status) {
        this.props.dispatch(
          setUniversity(
            userInfo.department.university.id,
            userInfo.department.university.name
          )
        );
        this.props.dispatch(
          setDepartment(userInfo.department.id, userInfo.department.name)
        );
        this.props.dispatch(
          setAdmin(userInfo.user.is_superuser || userInfo.user.is_staff)
        );
        this.props.dispatch(
          setUserInfo(
            userInfo.user.id,
            userInfo.user.username,
            userInfo.user.email,
            userInfo.user.first_name,
            userInfo.user.last_name,
            userInfo.id,
            userInfo.member_id
          )
        );
      } 
    }
    else {
      this.props.history.push("/signin/");
    }
  }

  render() {
    return (
      <div className="admin-panel-page">
        <AdminPanelDrawer></AdminPanelDrawer>
        <Copyright />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return state;
};
export default connect(mapStateToProps)(withRouter(AdminPanelPage));
