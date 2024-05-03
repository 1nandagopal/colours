import { Component } from "react";
import ColourBox from "./ColourBox";

import "./Palette.css";
import Navbar from "./Navbar";

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
        <Navbar changeLevel={this.changeLevel} level={this.state.level} />
        <div className="Palette-colours">{colourBoxes}</div>
      </div>
    );
  }
}
