import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert, Card } from "reactstrap";

class AddDevice extends Component {
  state = {
    device: "",
    os: "",
    manufacturer: "",
    message: "",
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  postDevice = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state.device);
    console.log(this.state.os);
    console.log(this.state.manufacturer);
    try {
      const resp = await fetch(
        "https://topcoders-be.herokuapp.com/api/devices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device: this.state.device,
            os: this.state.os,
            manufacturer: this.state.manufacturer,
          }),
        }
      );
      const res = await resp.json();
      console.log(res);
      if (res.status == 201) {
        window.location.href = "/";
      } else {
        this.setState({
          message: res.msg,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div
          style={{ justifyContent: "center", alignItems: "center" }}
          className=" container mt-5 form-wrapper center"
        >
          <Card>
            <form className="p-5 center" onSubmit={this.postDevice}>
              <h3 id="transition-modal-title">Add Device</h3>
              <p id="transition-modal-description">All field are required.</p>
              <div className="mb-2">
                <TextField
                  label="Device Name"
                  id="name"
                  name="device"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-2">
                <TextField
                  label="OS"
                  id="os"
                  name="os"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-2">
                <TextField
                  label="Manufaturer"
                  id="manufacturer"
                  name="manufacturer"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  type="submit"
                >
                  Add Now
                </Button>
              </div>
              {this.state.message && (
                <Alert variant="danger">{this.state.message}</Alert>
              )}
            </form>
          </Card>
        </div>
      </>
    );
  }
}

export default AddDevice;
