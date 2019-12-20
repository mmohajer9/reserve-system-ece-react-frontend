/* eslint-disable no-unused-vars */
import React from "react";
import {
  CssBaseline,
  Container,
  Grid,
  IconButton,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AddIcon from "@material-ui/icons/Add";
import SchoolIcon from "@material-ui/icons/School";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import EventNoteIcon from "@material-ui/icons/EventNote";
import "./AdminPanelHome.css";
class AdminPanelHome extends React.Component {
  render() {
    return (
      <div className="admin-panel-home">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item style={{ textAlign: "center" }}>
            <IconButton
              onMouseEnter={e => {}}
              color="primary"
              className="admin-panel-home-icon-btn"
              onClick={e => {
                this.props.history.push("/panel/admin/reserve");
              }}
            >
              <AddIcon className="admin-panel-home-icon" />
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              مشخض کردن تایم رزرو ها
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={e => {
                this.props.history.push("/panel/admin/reservations");
              }}
              color="primary"
              className="admin-panel-home-icon-btn"
            >
              <EventAvailableIcon className="admin-panel-home-icon" />{" "}
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              مشاهده رزرو های من
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              onMouseEnter={e => {}}
              color="primary"
              className="admin-panel-home-icon-btn"
              onClick={e => {
                this.props.history.push("/panel/admin/select-university");
              }}
            >
              <AccountBalanceIcon className="admin-panel-home-icon" />
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              انتخاب دانشگاه
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={e => {
                this.props.history.push("/panel/admin/select-department");
              }}
              color="primary"
              className="admin-panel-home-icon-btn"
            >
              <SchoolIcon className="admin-panel-home-icon" />
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              انتخاب دانشکده
            </Typography>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <IconButton
              onClick={e => {
                this.props.history.push("/panel/admin/set-reserve-slots");
              }}
              color="primary"
              className="admin-panel-home-icon-btn"
            >
              <EventNoteIcon className="admin-panel-home-icon" />
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              تعیین اسلات های رزرو
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        ></Grid>
      </div>
    );
  }
}

export default withRouter(AdminPanelHome);
