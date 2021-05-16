import React, { useState, useEffect } from "react";
import { Alert, Row, Spinner } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function DeviceDetails(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [fullname, setFullname] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [device, setDevice] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //function to retrieve device from user
  const retrieve = async () => {
    const id = params.id;

    try {
      const resp = await await fetch(
        `https://topcoders-be.herokuapp.com/api/devices/uncheckout/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await resp.json();

      setOpen(false);
      getDevice();
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  const checkDevice = async (e) => {
    e.preventDefault();
    console.log(e);
    const id = params.id;

    try {
      const resp = await fetch(
        `https://topcoders-be.herokuapp.com/api/devices/checkout/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lastCheckedOutBy: fullname,
          }),
        }
      );
      const res = await resp.json();
      console.log(res);
      if (res.status == 201) {
        getDevice();
        setOpen(false);
      } else {
        setMessage(res.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDevice = async () => {
    setLoading(true);
    console.log(params);
    const id = params.id;
    const resp = await fetch(
      `https://topcoders-be.herokuapp.com/api/devices/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await resp.json();
    setLoading(false);
    setDevice(result);
  };

  useEffect(() => {
    getDevice();
  }, []);

  const formBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Checkout Device</h2>
      <form onSubmit={checkDevice} id="simple-modal-description">
        <div className="mb-2">
          <TextField
            label="User Full Name"
            id="fullname"
            name="fullname"
            variant="outlined"
            onChange={(e) => setFullname(e.value)}
          />
        </div>
        <div>
          <Button variant="outlined" size="small" color="primary" type="submit">
            Checkout
          </Button>
        </div>
        {message && (
          <Alert color="danger">
            {message}{" "}
            {device.isCheckedOut && (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={retrieve}
              >
                Retrieve
              </Button>
            )}
          </Alert>
        )}
      </form>
    </div>
  );
  return (
    <div className="container m-5">
      {loading ? (
        <Spinner color="info" />
      ) : (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {device.manufacturer}
            </Typography>
            <Typography variant="h5" component="h2">
              {device.device}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {device.os}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Checked Out?</strong>{" "}
              {device.isCheckedOut ? (
                <span className="text-danger">Yes</span>
              ) : (
                <span className="text-primary">No</span>
              )}{" "}
              <br />
              {device.isCheckedOut && (
                <article>
                  {" "}
                  <strong>To:</strong> {device.lastCheckedOutBy}
                  <br />
                  <strong>When:</strong>{" "}
                  <Moment format="YYYY/MM/DD">
                    {device.lastCheckedOutDate}
                  </Moment>
                  <br />
                  <strong>Out for Days:</strong>{" "}
                  {device.isCheckedOut ? (
                    <Moment fromNow>{device.lastCheckedOutDate}</Moment>
                  ) : (
                    <span>Not out</span>
                  )}
                  <br />
                </article>
              )}
            </Typography>
          </CardContent>
          <CardActions>
            <div>
              <button type="button" onClick={handleOpen}>
                Checkout
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {formBody}
              </Modal>
            </div>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

export default DeviceDetails;
