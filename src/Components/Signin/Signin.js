import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Field, Form /* ErrorMessage */ } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import "./Signin.css";
import { toast } from "react-toastify";

import {
  createMuiTheme,
  ThemeProvider,
  jssPreset,
  StylesProvider
} from "@material-ui/core/styles";
import rtl from "jss-rtl";
import { create } from "jss";
import Axios from "axios";
import { API_URL, CLIENT_ID, RESERVE_SYSTEM_URL } from "../../Commons";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setUniversity, setDepartment, setAdmin, setUserInfo } from "../../Actions";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" target="_blank" href="https://mamad.me/">
        <strong>Mohammad Mahdi Mohajer</strong>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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

function Signin(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <div className={classes.paper} dir="rtl">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ fontFamily: "Vazir" }}
            >
              ورود به سامانه
            </Typography>
            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required(
                  "نام کاربری نمی تواند خالی باشد"
                ),

                password: Yup.string()
                  .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
                  .required("رمز عبور نمی‌تواند خالی باشد")
              })}
              onSubmit={(values, actions) => {
                // console.log(values , actions)
                const url = API_URL + "signin/oauth/token/";
                const fetchMemberUrl =
                  API_URL + RESERVE_SYSTEM_URL + "members/" + values.username;
                const signin_info = {
                  username: values.username,
                  password: values.password,
                  grant_type: "password",
                  client_id: CLIENT_ID
                };
                Axios.post(url, signin_info)
                  .then(async res => {
                    toast.success("ورود شما با موفقیت انجام شد", {
                      position: toast.POSITION.TOP_RIGHT
                    });
                    let memberInfo = {};
                    await Axios.get(fetchMemberUrl)
                      .then(res => {
                        memberInfo = res.data;
                      })
                      .catch(err => console.log(err.response));

                    const userInfo = {
                      ...res.data,
                      ...memberInfo,
                      login_status: true
                    };
                    localStorage.setItem("userInfo", JSON.stringify(userInfo));

                    props.dispatch(
                      setUniversity(
                        userInfo.department.university.id,
                        userInfo.department.university.name
                      )
                    );
                    props.dispatch(
                      setDepartment(
                        userInfo.department.id,
                        userInfo.department.name
                      )
                    );
                    props.dispatch(
                      setAdmin(
                        userInfo.user.is_superuser || userInfo.user.is_staff
                      )
                    );
                    props.dispatch(
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
                    if (userInfo.user.is_superuser || userInfo.user.is_staff) {
                      setTimeout(() => {
                        props.history.push("/panel/admin/");
                      }, 1000);
                    } else {
                      setTimeout(() => {
                        props.history.push("/panel/user/");
                      }, 1000);
                    }
                  })
                  .catch(err => {
                    console.log(err.response);
                    toast.error(
                      "خطا لطفا نام کاربری یا رمز عبور خود را بررسی کنید",
                      {
                        position: toast.POSITION.TOP_RIGHT
                      }
                    );
                    actions.setSubmitting(false);
                  });
              }}
              render={formProps => (
                <Form className={classes.form} noValidate>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="نام کاربری"
                    name="username"
                    // autoComplete="email"
                    // autoFocus
                    component={TextField}
                  />
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="رمز عبور"
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
                    ورود
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link
                        href="#"
                        variant="body2"
                        style={{ fontFamily: "Vazir" }}
                      >
                        بازیابی رمز عبور
                      </Link>
                    </Grid>
                    {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
                  </Grid>
                </Form>
              )}
            />
          </div>
        </ThemeProvider>
      </StylesProvider>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(Signin));
