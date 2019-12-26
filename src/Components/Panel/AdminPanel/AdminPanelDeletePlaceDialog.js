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
export default function AdminPanelDeletePlaceDialog(props) {
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ textAlign: "center" }} id="form-dialog-title">
          حذف مکان
        </DialogTitle>
        <DialogContent>
          <Avatar style={{ margin: "1em auto" , backgroundColor : "red" , padding : "2.5em"}} >
            <DeleteForeverIcon style={{fontSize  : "3em"}} fontSize="large"/>
          </Avatar>
          <DialogContentText style={{margin : "2em 0"}}>آیا مطمئن هستید که میخواهید مکان را حذف کنید ؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style ={{fontFamily : "Vazir" , fontSize : "1.5em"}} onClick={handleClose} color="primary">
            لغو
          </Button>
          <Button style ={{fontFamily : "Vazir" , fontSize : "1.5em"}} onClick={handleClose} color="primary">
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
