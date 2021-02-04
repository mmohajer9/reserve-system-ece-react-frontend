import React from "react";
import ChooseDate from "./ChooseDate";
import ChoosePlace from "./ChoosePlace";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { API_URL } from "../../../Commons";
import Axios from "axios";
import {
  setDateTimeSlots,
  setSelectedDate,
  setSelectedPlace,
  setReservations,
  setSelectedReservation,
  setSelectedDateTimeSlot
} from "../../../Actions";
import jalaali from "jalaali-js";
import { Grid } from "@material-ui/core";
import ReservationTable from "./ReservationTable";
import Reserve from "./Reserve";

class Reservations extends React.Component {
  state = {};

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      nextProps.selected_date === this.props.selected_date &&
      nextProps.selected_place === this.props.selected_place
    ) {
      return false;
    } else {
      return true;
    }
  }

  async componentDidMount() {
    // console.log(g_date);
    const url =
      API_URL +
      `api/reserve-system/reservations/list/${this.props.department_id}/`;
    await Axios.get(url, {
      params: {
        member_id: this.props.member_pk
      }
    })
      .then(res => {
        // console.log(res.data);
        this.props.dispatch(setReservations(res.data));
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  async componentDidUpdate() {
    if (this.props.reserve) {
      if (
        this.props.selected_date !== null &&
        this.props.selected_place !== ""
      ) {
        const g_date = jalaali.toGregorian(
          this.props.selected_date.year,
          this.props.selected_date.month,
          this.props.selected_date.day
        );
        // console.log(g_date);
        const url =
          API_URL +
          `api/reserve-system/places/${this.props.department_id}/${this.props.selected_place.id}/datetimeslots/`;
        await Axios.get(url, {
          params: {
            date: `${g_date.gy}-${g_date.gm}-${g_date.gd}`
          }
        })
          .then(res => {
            // console.log(res.data);
            //   this.setState({
            //     api_called: false
            //   });
            this.props.dispatch(setDateTimeSlots(res.data));
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    } else {
      if (
        this.props.selected_date !== null &&
        this.props.selected_place !== ""
      ) {
        const g_date = jalaali.toGregorian(
          this.props.selected_date.year,
          this.props.selected_date.month,
          this.props.selected_date.day
        );
        // console.log(g_date);
        const url =
          API_URL +
          `api/reserve-system/reservations/list/${this.props.department_id}/`;
        await Axios.get(url, {
          params: {
            date: `${g_date.gy}-${g_date.gm}-${g_date.gd}`,
            place_id: this.props.selected_place.id,
            member_id: this.props.member_pk
          }
        })
          .then(res => {
            // console.log(res.data);
            this.props.dispatch(setReservations(res.data));
          })
          .catch(err => {
            console.log(err.response);
          });
      } else if (
        this.props.selected_date === null &&
        this.props.selected_place !== ""
      ) {
        const url =
          API_URL +
          `api/reserve-system/reservations/list/${this.props.department_id}/`;
        await Axios.get(url, {
          params: {
            place_id: this.props.selected_place.id,
            member_id: this.props.member_pk
          }
        })
          .then(res => {
            // console.log(res.data);
            this.props.dispatch(setReservations(res.data));
          })
          .catch(err => {
            console.log(err.response);
          });
      } else if (
        this.props.selected_date !== null &&
        this.props.selected_place === ""
      ) {
        const g_date = jalaali.toGregorian(
          this.props.selected_date.year,
          this.props.selected_date.month,
          this.props.selected_date.day
        );
        const url =
          API_URL +
          `api/reserve-system/reservations/list/${this.props.department_id}/`;
        await Axios.get(url, {
          params: {
            date: `${g_date.gy}-${g_date.gm}-${g_date.gd}`,

            member_id: this.props.member_pk
          }
        })
          .then(res => {
            // console.log(res.data);
            this.props.dispatch(setReservations(res.data));
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setSelectedDate(null));
    this.props.dispatch(setSelectedPlace(""));
    this.props.dispatch(setSelectedDateTimeSlot(""));
    this.props.dispatch(setDateTimeSlots([]));
    this.props.dispatch(setSelectedReservation(""));
    this.props.dispatch(setReservations([]));
  }
  render() {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <ChooseDate />
          <ChoosePlace />
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          {this.props.reserve ? <Reserve /> : <ReservationTable />}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};
export default connect(mapStateToProps)(withRouter(Reservations));
