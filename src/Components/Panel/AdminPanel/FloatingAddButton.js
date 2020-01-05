import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      position: "relative"
    }
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1000
  }
}));

function FloatingAddButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab
        onClick={e => {
          if (props.selected_date !== null && props.selected_place !== "") {
            props.open_add_dialog();
          } else {
            alert("لطفا روز و تاریخ را مشخص کنید");
          }
        }}
        className={classes.fab}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(FloatingAddButton);