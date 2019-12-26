import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper, Typography } from "@material-ui/core";
import { Formik, Field, Form /* ErrorMessage */ } from "formik";
import "./AdminAddPlace.css";
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

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

function PaperSheet() {
  return (
    <Paper className="" dir="rtl" style={{ padding: "1em" }}>
      <Typography style={{ margin: "0em 0 1em 0" }} variant="h6" component="h3">
        اطلاعاتی برای نمایش وجود ندارد
      </Typography>
      <Typography component="p">
        ابتدا دانشگاه و دانشکده خود را مشخص کنید
      </Typography>
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
    background: "linear-gradient(to left , #42cca2, #215d9c);"
  }
}));

function AdminAddPlace(props) {
  const classes = useStyles();

  if (props.university_id === "" || props.department_id === "") {
    return <PaperSheet />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <div className={classes.paper} dir="rtl">
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
                  <Form className={classes.form} noValidate>
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
                    {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      style={{ fontFamily: "Vazir", fontSize: "1.2em" }}
                    >
                      ثبت مکان
                    </Button>
                  </Form>
                )}
              />
            </div>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(AdminAddPlace);
