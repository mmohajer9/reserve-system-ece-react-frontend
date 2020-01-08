import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Grid, Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditIcon from "@material-ui/icons/Edit";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import EventAvailableRoundedIcon from "@material-ui/icons/EventAvailableRounded";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import AccountBalanceRoundedIcon from "@material-ui/icons/AccountBalanceRounded";
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import "./AdminPanelDrawer.css";
import AdminPanelHome from "./AdminPanelHome";
import ChooseUniversity from "./ChooseUniversity";
import ChooseDepartment from "./ChooseDepartment";
import AdminPlaceManagement from "./AdminPlaceManagement";
import { connect } from "react-redux";
import { toast } from "react-toastify";
// import MakeDateTimeSlot from "./MakeDateTimeSlot";
// import ChoosePlace from "./ChoosePlace";
import DateTimeSlotTable from "./DateTimeSlotTable";
import ChooseDatePlace from "./ChooseDatePlace";
import Reservations from "./Reservations";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    fontFamily: "Vazir"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    // flexGrow: 1, //if uncomment -> title will go to the left most
    fontFamily: "Vazir"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  toolbar: {
    justifyContent: "space-between"
  }
}));

function AdminPanelDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(
    props.location.pathname === "/panel/admin/reserve" ||
      props.location.pathname === "/panel/admin/reserve/"
      ? 1
      : props.location.pathname === "/panel/admin/reservations" ||
        props.location.pathname === "/panel/admin/reservations/"
      ? 2
      : props.location.pathname === "/panel/admin/select-university" ||
        props.location.pathname === "/panel/admin/select-university/"
      ? 4
      : props.location.pathname === "/panel/admin/select-department" ||
        props.location.pathname === "/panel/admin/select-department/"
      ? 5
      : props.location.pathname === "/panel/admin" ||
        props.location.pathname === "/panel/admin/"
      ? 0
      : props.location.pathname === "/panel/admin/set-reserve-slots" ||
        props.location.pathname === "/panel/admin/set-reserve-slots/"
      ? 3
      : props.location.pathname === "/panel/admin/place-management" ||
        props.location.pathname === "/panel/admin/place-management/"
      ? 6
      : null
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar
          className={classes.toolbar}
          style={{ background: "linear-gradient(to right , #42cca2, #215d9c)" }}
        >
          <Typography variant="h6" noWrap className={classes.title}>
            {props.location.pathname === "/panel/admin/reserve" ||
            props.location.pathname === "/panel/admin/reserve/"
              ? "رزرو"
              : props.location.pathname === "/panel/admin/reservations" ||
                props.location.pathname === "/panel/admin/reservations/"
              ? "رزرو های من"
              : props.location.pathname === "/panel/admin/select-university" ||
                props.location.pathname === "/panel/admin/select-university/"
              ? "انتخاب دانشگاه"
              : props.location.pathname === "/panel/admin/select-department" ||
                props.location.pathname === "/panel/admin/select-department/"
              ? "انتخاب دانشکده"
              : props.location.pathname === "/panel/admin" ||
                props.location.pathname === "/panel/admin/"
              ? "خانه"
              : props.location.pathname === "/panel/admin/set-reserve-slots" ||
                props.location.pathname === "/panel/admin/set-reserve-slots/"
              ? "تعیین اسلات رزرو"
              : props.location.pathname === "/panel/admin/place-management" ||
                props.location.pathname === "/panel/admin/place-management/"
              ? "مدیریت مکان ها"
              : null}
          </Typography>
          <Typography variant="h6" noWrap className={classes.title}>
            پنل مدیریت
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Route exact path="/panel/admin/reserve">
          <Container maxWidth="md">
            <Reservations reserve={true} />
          </Container>
        </Route>
        <Route exact path="/panel/admin/reservations">
          <Container maxWidth="md">
            <Reservations reserve={false} />
          </Container>
        </Route>
        <Route exact path="/panel/admin/select-university">
          <ChooseUniversity />
        </Route>
        <Route exact path="/panel/admin/select-department">
          <ChooseDepartment />
        </Route>
        <Route exact path="/panel/admin/set-reserve-slots">
          <Container maxWidth="md">
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              {/* <ChoosePlace />
              <MakeDateTimeSlot /> */}
              <ChooseDatePlace />
            </Grid>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <DateTimeSlotTable />
            </Grid>
          </Container>
        </Route>
        <Route exact path="/panel/admin/place-management">
          <Container maxWidth="md">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <AdminPlaceManagement />
            </Grid>
          </Container>
        </Route>
        <Route exact path="/panel/admin/">
          <AdminPanelHome setSelectedIndex={setSelectedIndex} />
        </Route>
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={classes.drawerHeader}
          style={{ background: "linear-gradient(to right , #fdfbfb, #ebedee)" }}
        >
          <IconButton color="primary" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.title}
          >
            {`${props.first_name}  ${props.last_name}`}
          </Typography>
          <IconButton
            onClick={e => {
              localStorage.removeItem("userInfo");
              toast.info("خدانگهدار", {
                position: toast.POSITION.TOP_LEFT
              });
              setTimeout(() => {
                props.history.push("/signin/");
              }, 1000);
            }}
            color="secondary"
          >
            <ExitToAppIcon />
          </IconButton>
          <IconButton style={{ color: "green" }}>
            <EditIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {["خانه", "رزرو", "رزرو های من", "تعیین اسلات های رزرو"].map(
            (text, index) => (
              <ListItem
                button
                onClick={event => {
                  if (index === 0) {
                    setSelectedIndex(0);
                    props.history.push("/panel/admin");
                    setOpen(false);
                  } else if (index === 1) {
                    setSelectedIndex(1);
                    props.history.push("/panel/admin/reserve");
                    setOpen(false);
                  } else if (index === 2) {
                    setSelectedIndex(2);
                    props.history.push("/panel/admin/reservations");
                    setOpen(false);
                  } else if (index === 3) {
                    setSelectedIndex(3);
                    props.history.push("/panel/admin/set-reserve-slots");
                    setOpen(false);
                  }
                }}
                key={text}
                selected={selectedIndex === index}
              >
                <ListItemIcon>
                  {index === 1 ? (
                    <AddRoundedIcon />
                  ) : index === 0 ? (
                    <HomeIcon />
                  ) : index === 2 ? (
                    <EventAvailableRoundedIcon />
                  ) : (
                    <EventNoteIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} style={{ textAlign: "end" }} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["انتخاب دانشگاه", "انتخاب دانشکده", "مدیریت مکان ها"].map(
            (text, index) => (
              <ListItem
                onClick={e => {
                  if (index === 0) {
                    props.history.push("/panel/admin/select-university");
                    setSelectedIndex(4);
                    setOpen(false);
                  } else if (index === 1) {
                    props.history.push("/panel/admin/select-department");
                    setSelectedIndex(5);
                    setOpen(false);
                  } else {
                    props.history.push("/panel/admin/place-management");
                    setSelectedIndex(6);
                    setOpen(false);
                  }
                }}
                button
                key={text}
                selected={index + 4 === selectedIndex}
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <AccountBalanceRoundedIcon />
                  ) : index === 1 ? (
                    <SchoolRoundedIcon />
                  ) : (
                    <PlaceIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} style={{ textAlign: "end" }} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </div>
  );
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(withRouter(AdminPanelDrawer));
