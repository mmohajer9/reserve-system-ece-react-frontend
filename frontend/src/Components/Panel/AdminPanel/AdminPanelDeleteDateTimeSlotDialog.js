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
import { setDateTimeSlots } from "../../../Actions";
import jalaali from "jalaali-js";

function AdminPanelDeleteDateTimeSlotDialog(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    props.close_delete_dialog();
    setOpen(false);
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
          حذف اسلات زمان
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
            آیا مطمئن هستید که میخواهید این اسلات زمانی را حذف کنید ؟
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
            onClick={e => {
              const token = JSON.parse(localStorage.getItem("userInfo"))
                .access_token;
              const headers = {
                Authorization: `Bearer ${token}`
              };
              const url =
                API_URL +
                RESERVE_SYSTEM_URL +
                `places/${props.department_id}/${props.selected_place.id}/datetimeslots/${props.selected_date_time_slot.id}/`;
              Axios.delete(url, {
                headers: headers
              })
                .then(res => {
                  toast.info("اسلات مورد نظر خذف شد !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  const g_date = jalaali.toGregorian(
                    props.selected_date.year,
                    props.selected_date.month,
                    props.selected_date.day
                  );
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
                  toast.error("خطا در حذف اسلات مورد نظر !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                });
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
