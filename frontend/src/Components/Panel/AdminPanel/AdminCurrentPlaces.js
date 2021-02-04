/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connect } from "react-redux";
import "./AdminCurrentPlaces.css";
import {
  //   IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  ClickAwayListener
} from "@material-ui/core";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import Axios from "axios";
import { API_URL } from "../../../Commons";
import AdminPanelEditPlaceDialog from "./AdminPanelEditPlaceDialog";
import AdminPanelDeletePlaceDialog from "./AdminPanelDeletePlaceDialog";

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
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

function AdminCurrentPlaces(props) {
  const classes = useStyles();
  const [placeID, setPlaceID] = React.useState(0);
  const [placeInfo, setPlaceInfo] = React.useState({
    name: "",
    capacity: "",
    location: ""
  });
  const [expanded, setExpanded] = React.useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [placeList, setPlaceList] = React.useState([]);

  const callGetPlaces = () => {
    if (props.university_id !== "" && props.department_id !== "") {
      const url = API_URL + "api/reserve-system/places/" + props.department_id;
      Axios.get(url)
        .then(res => {
          //   console.log(res.data);
          setPlaceList(res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    callGetPlaces();
  }, []);
  return (
    <div className={classes.root}>
      {showEditDialog === true ? (
        <AdminPanelEditPlaceDialog
          placeID={placeID}
          placeInfo={placeInfo}
          setPlaceID={setPlaceID}
          setShowEditDialog={setShowEditDialog}
          callGetPlaces={callGetPlaces}
        />
      ) : null}
      {showRemoveDialog === true ? (
        <AdminPanelDeletePlaceDialog
          placeID={placeID}
          setPlaceID={setPlaceID}
          setShowRemoveDialog={setShowRemoveDialog}
          callGetPlaces={callGetPlaces}
        />
      ) : null}
      {props.university_id === "" || props.department_id === "" ? (
        <PaperSheet />
      ) : (
        placeList.map((item, index) => (
          <ExpansionPanel
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            key={index}
            onClick={e => {
              setPlaceID(item.id);
              setPlaceInfo({
                name: item.name,
                capacity: item.capacity,
                location: item.location
              });
              // console.log(item);
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                {item.name} - {props.department_name}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {item.location} - {item.capacity} نفر ظرفیت
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <ListItem
                    button
                    onClick={e => setShowEditDialog(true)}
                    style={{
                      borderRadius: "50px",
                      background:
                        "linear-gradient(to right , #000428, #004e92)",
                      color: "white",
                      width: "auto",
                      marginLeft: "1em",
                      marginTop: "1em"
                    }}
                  >
                    <ListItemIcon>
                      <EditLocationIcon
                        fontSize="large"
                        style={{ color: "white" }}
                      />
                    </ListItemIcon>
                    <ListItemText>ویرایش مکان</ListItemText>
                  </ListItem>
                  <ListItem
                    onClick={e => setShowRemoveDialog(true)}
                    button
                    style={{
                      borderRadius: "50px",
                      background:
                        "linear-gradient(to right , #eb3349, #f45c43)",
                      color: "white",
                      width: "auto",
                      marginLeft: "1em",
                      marginTop: "1em"
                    }}
                  >
                    <ListItemIcon>
                      <DeleteForeverIcon
                        fontSize="large"
                        style={{ color: "white" }}
                      />
                    </ListItemIcon>
                    <ListItemText>حذف مکان</ListItemText>
                  </ListItem>
                </Grid>
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(AdminCurrentPlaces);
