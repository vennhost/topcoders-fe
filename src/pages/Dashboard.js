import { TramOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Row, Spinner } from "reactstrap";
import AddDevice from "../components/AddDevice";
import SingleDevice from "../components/SingleDevice";

function Dashboard(props) {
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState("");
  const [os, setOs] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [loading, setLoading] = useState(false);

  const getDevices = async () => {
    setLoading(true);
    const resp = await fetch("https://mydevice-be.herokuapp.com/api/devices", {
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
      <h1>Dashboard</h1>
      <main className="container">
        <div>
          <AddDevice
            changeName={changeName}
            changeMan={changeMan}
            changeOs={changeOs}
            device={device}
          />
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
