import React from "react";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, DialogContentText } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Axios from "axios";
import { API_URL, RESERVE_SYSTEM_URL } from "../../../Commons";
import { toast } from "react-toastify";

function AdminPanelDeleteDateTimeSlotDialog(props) {
  const [open, setOpen] = React.useState(true);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen(false);
    props.setShowRemoveDialog(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        dir="rtl"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ textAlign: "center" }} id="form-dialog-title">
          حذف مکان
        </DialogTitle>
        <DialogContent>
          <Avatar
            style={{
              margin: "1em auto",
              backgroundColor: "red",
              padding: "2.5em"
            }}
          >
            <DeleteForeverIcon style={{ fontSize: "3em" }} fontSize="large" />
          </Avatar>
          <DialogContentText style={{ margin: "2em 0" }}>
            آیا مطمئن هستید که میخواهید مکان را حذف کنید ؟
          </DialogContentText>
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
              const url =
                API_URL +
                RESERVE_SYSTEM_URL +
                `places/${props.department_id}/${props.placeID}/`;
              await Axios.delete(url, {
                headers: headers
              })
                .then(res => {
                  toast.info("مکان مورد نظر خذف شد !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                })
                .catch(err => {
                  toast.error("خطا در حذف مکان مورد نظر !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                });
              props.callGetPlaces();
              handleClose();
            }}
            color="primary"
          >
            تایید
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
  withRouter(AdminPanelDeleteDateTimeSlotDialog)
);
