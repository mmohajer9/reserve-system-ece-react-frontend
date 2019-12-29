/* eslint-disable no-unused-vars */
import React from "react";
import {
  CssBaseline,
  Container,
  Link,
  Typography,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminPanelDrawer from "../../Components/Panel/AdminPanel/AdminPanelDrawer";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  setUniversity,
  setDepartment,
  setAdmin,
  setUserInfo,
  setDataStatus
} from "../../Actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import { API_URL, RESERVE_SYSTEM_URL } from "../../Commons";

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
  async componentDidMount() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      if (userInfo.login_status) {

        const fetchMemberUrl = API_URL + RESERVE_SYSTEM_URL + "members/" + userInfo.user.username;

        let memberInfo = {};
        await Axios.get(fetchMemberUrl)
          .then(res => {
            // console.log(res.data);
            memberInfo = res.data;
          })
          .catch(err => console.log(err.response));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            ...memberInfo
          })
        );
        userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

        this.props.dispatch(setDataStatus(true));
      }
    } else {
      this.props.history.push("/signin/");
    }
  }

  render() {
    if (this.props.is_data_recieved) {
      return (
        <div className="admin-panel-page">
          <AdminPanelDrawer></AdminPanelDrawer>
          <Copyright />
        </div>
      );
    } else {
      return (
        <Grid
          container
          style={{ marginTop: "20%" }}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <CircularProgress size="10em" />
          <Typography style={{ marginTop: "5em" }} component="h2" variant="h5">
            در حال اماده سازی
          </Typography>
        </Grid>
      );
    }
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};
export default connect(mapStateToProps)(withRouter(AdminPanelPage));
