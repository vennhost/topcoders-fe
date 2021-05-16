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

export default function SingleDevice({ device, click }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Col xs={6} md={4} className="mb-4">
      <Link to={`/details/${device._id}`}>
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
                <article>
                  {" "}
                  To: {device.lastCheckedOutBy}
                  <br />
                  When:{" "}
                  <Moment format="YYYY/MM/DD">
                    {device.lastCheckedOutDate}
                  </Moment>
                  <br />
                  Out for Days:{" "}
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
            <Button
              onClick={() => click(device._id)}
              color="primary"
              size="small"
            >
              Details
            </Button>
          </CardActions>
        </Card>
      </Link>
    </Col>
  );
}
