import { TramOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Row, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import SingleDevice from "../components/SingleDevice";

function Dashboard(props) {
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState("");
  const [os, setOs] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [loading, setLoading] = useState(false);

  const getDevices = async () => {
    setLoading(true);
    const resp = await fetch("https://topcoders-be.herokuapp.com/api/devices", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    setLoading(false);
    setDevices(result);
  };

  useEffect(() => {
    getDevices();
  }, []);

  const changeName = (e) => {
    console.log(e.target.value);
  };
  const changeMan = (e) => {};
  const changeOs = (e) => {};

  const details = (id) => {
    window.location.href = `/details/${id}`;
  };

  return (
    <div>
      <main className="container">
        <div className="mt-5">
          <Link style={{ textDecoration: "none" }} className="btn-lg" to="/add">
            Add Device
          </Link>
        </div>
        <hr />
        {loading && <Spinner color="info" />}
        <Row>
          {devices &&
            devices.map((device) => (
              <SingleDevice device={device} click={details} />
            ))}
        </Row>
      </main>
    </div>
  );
}

export default Dashboard;
