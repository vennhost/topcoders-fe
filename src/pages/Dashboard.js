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

  //function to remove devices from list
  const removeDevice = async (id) => {
    try {
      const resp = await await fetch(
        `https://topcoders-be.herokuapp.com/api/devices/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp);
      //load devices again when one is removed
      getDevices();
    } catch (error) {
      console.log(error);
    }
  };
  //function to get all devices
  const getDevices = async () => {
    //set spinner for loading devices
    setLoading(true);
    //fetch from api
    const resp = await fetch("https://topcoders-be.herokuapp.com/api/devices", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    setLoading(false);
    //set devices to devices state
    setDevices(result);
  };

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <div>
      <main className="container">
        <div className="mt-5">
          <Link style={{ textDecoration: "none" }} className="btn-lg" to="/add">
            Add Device
          </Link>
        </div>
        <hr />
        {/* set spinner is devices still loading */}
        {loading ? (
          <Spinner color="info" />
        ) : (
          <Row>
            {devices &&
              devices.map((device) => (
                <SingleDevice
                  device={device}
                  //function inherited from props
                  removeDevice={removeDevice}
                />
              ))}
          </Row>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
