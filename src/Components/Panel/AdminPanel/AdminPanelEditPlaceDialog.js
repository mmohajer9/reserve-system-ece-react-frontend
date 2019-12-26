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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

export default function AdminPanelEditPlaceDialog(props) {
  const [open, setOpen] = React.useState(true);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
    props.setShowEditDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ textAlign: "right" }} id="form-dialog-title">
          ویرایش مکان
        </DialogTitle>
        <DialogContent>
          <StylesProvider jss={jss}>
            <ThemeProvider theme={theme}>
              <Formik
                initialValues={{
                  name: "",
                  capacity: "",
                  location: ""
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("نام نمی تواند خالی باشد"),
                  capacity: Yup.string().required("ظرفیت نمی تواند خالی باشد"),
                  location: Yup.string().required(
                    "موقعیت مکان نمیتواند خالی باشد"
                  )
                })}
                onSubmit={e => {}}
                render={({ errors, touched, validateField, validateForm }) => (
                  <Form
                    style={{
                      width: "100%", // Fix IE 11 issue.
                      marginTop: theme.spacing(2)
                    }}
                    noValidate
                  >
                    <Field
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="نام مکان"
                      name="name"
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
          <Button style ={{fontFamily : "Vazir" , fontSize : "1.5em"}} onClick={handleClose} color="primary">
            لغو
          </Button>
          <Button style ={{fontFamily : "Vazir" , fontSize : "1.5em"}} onClick={handleClose} color="primary">
            ویرایش
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
