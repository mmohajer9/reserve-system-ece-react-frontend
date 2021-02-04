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
  setSelectedPlace
} from "../../../Actions";
import jalaali from "jalaali-js";

class ChooseDatePlace extends React.Component {
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

  async componentDidUpdate() {
    if (this.props.selected_date !== null && this.props.selected_place !== "") {
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
  }

  componentWillUnmount() {
    this.props.dispatch(setSelectedDate(null));
    this.props.dispatch(setSelectedPlace(""));
    this.props.dispatch(setDateTimeSlots([]));
  }
  render() {
    return (
      <>
        <ChooseDate />
        <ChoosePlace />
      </>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};
export default connect(mapStateToProps)(withRouter(ChooseDatePlace));
