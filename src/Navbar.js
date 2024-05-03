import { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./Navbar.css";
import { MenuItem, Select } from "@mui/material";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colourFormat: "hex",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ colourFormat: e.target.value });
    this.props.changeColourFormat(e.target.value);
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
          <Select value={this.state.colourFormat} onChange={this.handleChange}>
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}
