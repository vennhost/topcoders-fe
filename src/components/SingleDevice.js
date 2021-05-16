import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Col } from "reactstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
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
});

export default function SingleDevice({ device, click, removeDevice }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Col xs={6} md={4} className="mb-4">
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
            Checked Out?{" "}
            {device.isCheckedOut ? (
              <span className="text-danger">Yes</span>
            ) : (
              <span className="text-primary">No</span>
            )}{" "}
            <br />
            {device.isCheckedOut && (
              <p>
                {" "}
                To: {device.lastCheckedOutBy}
                <br />
                When:{" "}
                <Moment format="YYYY/MM/DD">{device.lastCheckedOutDate}</Moment>
                <br />
                Out for Days:{" "}
                {device.isCheckedOut ? (
                  <Moment fromNow>{device.lastCheckedOutDate}</Moment>
                ) : (
                  <span>Not out</span>
                )}
                <br />
              </p>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/details/${device._id}`}>
            <Button color="primary" size="small">
              Device Details
            </Button>
          </Link>
          <Button
            onClick={() => removeDevice(device._id)}
            color="red"
            size="small"
          >
            Remove Device
          </Button>
        </CardActions>
      </Card>
    </Col>
  );
}
