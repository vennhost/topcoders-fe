import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddDevice({
  device,
  changeName,
  changeMan,
  changeOs,
  submit,
  e,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Device
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Add Device</h3>
            <p id="transition-modal-description">All field are required.</p>
            <div className="mb-2">
              <TextField
                label="Device Name"
                id="name"
                defaultValue="Device Name"
                variant="outlined"
                size="small"
                value={device}
                onChange={(e) => changeName()}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="OS"
                id="os"
                defaultValue="Operating System"
                variant="outlined"
                size="small"
                onChange={(e) => changeOs()}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="Manufaturer"
                id="manufacturer"
                defaultValue="Small"
                variant="outlined"
                size="small"
                onChange={(e) => changeMan()}
              />
            </div>
            <div>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.margin}
                type="submit"
                onClick={(e) => submit()}
              >
                Add Now
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
