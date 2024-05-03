import { Component } from "react";

import "./ColourBox.css";

export default class ColourBox extends Component {
  render() {
    const { name, background } = this.props;
    return (
      <div style={{ background: background }} className="ColourBox">
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">More</span>
      </div>
    );
  }
}
