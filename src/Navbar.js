import { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colourFormat: "hex",
      open: false,
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({ colourFormat: e.target.value, open: true });
    this.props.changeColourFormat(e.target.value);
  }

  closeSnackBar() {
    this.setState({ open: false });
  }
  render() {
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {this.props.level}</span>
          <div className="slider">
            <Slider
              defaultValue={this.props.level}
              min={100}
              max={900}
              step={100}
              onChange={this.props.changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select
            value={this.state.colourFormat}
            onChange={this.handleFormatChange}
          >
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={2000}
          message={
            <span id="message-id">
              Format Changed to {this.state.colourFormat.toUpperCase()}
            </span>
          }
          action={[
            <IconButton
              onClick={this.closeSnackBar}
              color="inherit"
              key="close"
              aria-label="close button"
            >
              <CloseIcon />
            </IconButton>,
          ]}
          onClose={this.closeSnackBar}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
        ></Snackbar>
      </header>
    );
  }
}
