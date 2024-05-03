import { Component } from "react";

import "./ColourBox.css";

export default class ColourBox extends Component {
  render() {
    return (
      <div style={{ background: this.props.background }} className="ColourBox">
        <span>{this.props.name}</span>
        <span>MORE</span>
      </div>
    );
  }
}
