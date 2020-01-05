import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, /*Field*/ Form /* ErrorMessage */ } from "formik";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "jalali-moment";

import "./AdminPanelAddDateTimeSlotDialog.css";
// import * as Yup from "yup";
import {
  createMuiTheme,
  ThemeProvider,
  jssPreset,
  StylesProvider
} from "@material-ui/core/styles";
import rtl from "jss-rtl";
import { create } from "jss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { API_URL, RESERVE_SYSTEM_URL } from "../../../Commons";
import { toast } from "react-toastify";
import Axios from "axios";
import { Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import jalaali from "jalaali-js";
import { setDateTimeSlots } from "../../../Actions";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

function AdminPanelAddDateTimeSlotDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [beginTime, setBeginTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [isReserved, setIsReserved] = React.useState(false);

  const handleClose = () => {
    props.close_add_dialog();
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        dir="rtl"
      >
        <DialogTitle style={{ textAlign: "right" }} id="form-dialog-title">
          اضافه کردن اسلات زمان
        </DialogTitle>
        <DialogContent>
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
              <Formik
                initialValues={{
                  begin_time: "",
                  end_time: "",
                  isReserved: false
                }}
                render={formProps => (
                  <Form
                    style={{
                      width: "100%", // Fix IE 11 issue.
                      marginTop: theme.spacing(2)
                    }}
                    noValidate
                  >
                    {/* {console.log({
                      begin_time: moment(beginTime).format("HH:mm"),
                      end_time: moment(endTime).format("HH:mm"),
                      isReserved
                    })} */}
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        clearable
                        ampm={false}
                        label="زمان شروع"
                        value={beginTime}
                        onChange={setBeginTime}
                        style={{ display: "block", margin: "1em 0" }}
                        dir="rtl"
                      />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <TimePicker
                        clearable
                        ampm={false}
                        label="زمان پایان"
                        value={endTime}
                        onChange={setEndTime}
                        style={{ display: "block", margin: "1em 0" }}
                      />
                    </MuiPickersUtilsProvider>
                    <Typography
                      component="label"
                      variant="subtitle2"
                      style={{ fontFamily: "Vazir", marginLeft: "1em" }}
                    >
                      رزرو
                    </Typography>
                    {/* <Field
                      variant="outlined"
                      margin="normal"
                      name="isReserved"
                      label="رزرو شده ؟"
                      id="isReserved"
                      style={{ fontFamily: "Vazir" }}
                      // autoComplete=""
                      component={CheckboxWithLabel}
                    /> */}
                    <FormControlLabel
                      style={{ fontFamily: "Vazir" }}
                      value={isReserved}
                      control={<Checkbox color="primary" />}
                      onChange={e => setIsReserved(!isReserved)}
                      // labelPlacement="start"
                    />
                  </Form>
                )}
              />
            </ThemeProvider>
          </StylesProvider>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ fontFamily: "Vazir", fontSize: "1.5em" }}
            onClick={handleClose}
            color="primary"
          >
            لغو
          </Button>
          <Button
            style={{ fontFamily: "Vazir", fontSize: "1.5em" }}
            onClick={e => {
              const token = JSON.parse(localStorage.getItem("userInfo"))
                .access_token;
              const headers = {
                Authorization: `Bearer ${token}`
              };
              const g_date = jalaali.toGregorian(
                props.selected_date.year,
                props.selected_date.month,
                props.selected_date.day
              );
              const submitInfo = {
                date: `${g_date.gy}-${g_date.gm}-${g_date.gd}`,
                begin_time: moment(beginTime).format("HH:mm"),
                end_time: moment(endTime).format("HH:mm"),
                isReserved,
                place: props.selected_place.id
              };
              console.log(submitInfo);
              const url =
                API_URL +
                RESERVE_SYSTEM_URL +
                `places/${props.department_id}/${props.selected_place.id}/datetimeslots/`;
              Axios.post(url, submitInfo, {
                headers: headers
              })
                .then(res => {
                  console.log(res.data);
                  toast.info("اسلات مورد نظر اضافه شد !", {
                    position: toast.POSITION.TOP_RIGHT
                  });

                  const url =
                    API_URL +
                    `api/reserve-system/places/${props.department_id}/${props.selected_place.id}/datetimeslots/`;
                  Axios.get(url, {
                    params: {
                      date: `${g_date.gy}-${g_date.gm}-${g_date.gd}`
                    }
                  })
                    .then(res => {
                      // console.log(res.data);
                      //   this.setState({
                      //     api_called: false
                      //   });
                      props.dispatch(setDateTimeSlots(res.data));
                    })
                    .catch(err => {
                      console.log(err.response);
                    });
                })
                .catch(err => {
                  console.log(err.response);
                  toast.error("خطا در اضافه کردن اسلات مورد نظر !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                });
              handleClose();
            }}
            color="primary"
          >
            اضافه کن
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(
  withRouter(AdminPanelAddDateTimeSlotDialog)
);
