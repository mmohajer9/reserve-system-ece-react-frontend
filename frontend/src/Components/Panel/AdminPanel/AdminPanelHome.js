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
import PlaceIcon from "@material-ui/icons/Place";
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
                this.props.setSelectedIndex(1);
              }}
            >
              <AddIcon className="admin-panel-home-icon" />
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              مشخص کردن رزرو ها
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={e => {
                this.props.history.push("/panel/admin/reservations");
                this.props.setSelectedIndex(2);
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
          <Grid item style={{ textAlign: "center" }}>
            <IconButton
              onClick={e => {
                this.props.history.push("/panel/admin/set-reserve-slots");
                this.props.setSelectedIndex(3);
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
        >
          <Grid item>
            <IconButton
              onMouseEnter={e => {}}
              color="primary"
              className="admin-panel-home-icon-btn"
              onClick={e => {
                this.props.history.push("/panel/admin/select-university");
                this.props.setSelectedIndex(4);
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
                this.props.setSelectedIndex(5);
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
          <Grid item>
            <IconButton
              onClick={e => {
                this.props.history.push("/panel/admin/place-management");
                this.props.setSelectedIndex(6);
              }}
              color="primary"
              className="admin-panel-home-icon-btn"
            >
              <PlaceIcon className="admin-panel-home-icon" />
            </IconButton>
            <Typography style={{ textAlign: "center" }} variant="body1">
              مدیریت مکان
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(AdminPanelHome);
