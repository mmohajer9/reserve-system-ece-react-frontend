import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik, Field, Form /* ErrorMessage */ } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

function AdminPanelEditDateTimeSlotDialog(props) {
  const [open, setOpen] = React.useState(true);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
    props.setShowEditDialog(false);
  };

  const [editInfo, setEditInfo] = React.useState({
    name: props.placeInfo.name,
    capacity: props.placeInfo.capacity,
    location: props.placeInfo.location
  });

  // console.log(editInfo);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        dir="rtl"
      >
        <DialogTitle style={{ textAlign: "right" }} id="form-dialog-title">
          ویرایش مکان
        </DialogTitle>
        <DialogContent>
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
              <Formik
                initialValues={{
                  name: props.placeInfo.name,
                  capacity: props.placeInfo.capacity,
                  location: props.placeInfo.location
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("نام نمی تواند خالی باشد"),
                  capacity: Yup.string().required("ظرفیت نمی تواند خالی باشد"),
                  location: Yup.string().required(
                    "موقعیت مکان نمیتواند خالی باشد"
                  )
                })}
                onSubmit={(values, actions) => {
                  console.log(values, actions);
                }}
                render={formProps => (
                  <Form
                    style={{
                      width: "100%", // Fix IE 11 issue.
                      marginTop: theme.spacing(2)
                    }}
                    noValidate
                  >
                    {setEditInfo(
                      formProps.values
                    ) /* setting the editInfo Valeus*/}
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="نام مکان"
                      name="name"
                      style={{ fontFamily: "Vazir" }}
                      // autoComplete="email"
                      // autoFocus
                      component={TextField}
                    />
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="capacity"
                      label="ظرفیت"
                      id="capacity"
                      style={{ fontFamily: "Vazir" }}
                      type="number"
                      // autoComplete=""
                      component={TextField}
                    />
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="location"
                      label="موقعیت"
                      id="location"
                      style={{ fontFamily: "Vazir" }}
                      // autoComplete=""
                      component={TextField}
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
            onClick={async e => {
              const token = JSON.parse(localStorage.getItem("userInfo"))
                .access_token;
              const headers = {
                Authorization: `Bearer ${token}`
              };
              const submitInfo = {
                ...editInfo,
                department: props.department_id
              };
              const url =
                API_URL +
                RESERVE_SYSTEM_URL +
                `places/${props.department_id}/${props.placeID}/`;
              await Axios.put(url, submitInfo, {
                headers: headers
              })
                .then(res => {
                  toast.info("مکان مورد نظر ویرایش شد !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                })
                .catch(err => {
                  toast.error("خطا در ویرایش مکان مورد نظر !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                });
              props.callGetPlaces();
              handleClose();
            }}
            color="primary"
          >
            ویرایش
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(AdminPanelEditDateTimeSlotDialog));
