import { Component } from "react";
import ColourBox from "./ColourBox";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./Palette.css";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    console.log(level);
    this.setState({ level });
  }
  render() {
    const colourBoxes = this.props.palette.colours[this.state.level].map(
      (colour) => <ColourBox background={colour.hex} name={colour.name} />
    );
    return (
      <div className="Palette">
        <div className="slider">
          <Slider
            defaultValue={this.state.level}
            min={100}
            max={900}
            step={100}
            onChange={this.changeLevel}
          />
        </div>
        <div className="Palette-colours">{colourBoxes}</div>
      </div>
    );
  }
}
