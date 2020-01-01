/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import DatePicker from "react-modern-calendar-datepicker";

import "./MakeDateTimeSlot.css";
import { connect } from "react-redux";
import { setSelectedDate } from "../../../Actions";

function MakeDateTimeSlot(props) {
  const [selectedDay, setSelectedDay] = useState(null);
  props.dispatch(setSelectedDate(selectedDay));

  return (
    <div style={{ margin: "3em 0" }}>
      <DatePicker
        value={selectedDay}
        onChange={e => {
          setSelectedDay(e);
        }}
        shouldHighlightWeekends
        locale="fa"
        calendarClassName="responsive-calendar"
        inputPlaceholder="لطفا تاریخ خود را انتخاب کنید"
      />
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(MakeDateTimeSlot);
