import { Component } from "react";
import ColourBox from "./ColourBox";

import "./Palette.css";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, colourFormat: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeColourFormat = this.changeColourFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeColourFormat(newFormat) {
    this.setState({ colourFormat: newFormat });
  }

  render() {
    const colourBoxes = this.props.palette.colours[this.state.level].map(
      (colour) => (
        <ColourBox
          background={colour[this.state.colourFormat]}
          name={colour.name}
          moreUrl={`/palette/${this.props.palette.id}/${colour.id}`}
          showingFullPalette
          key={colour.id}
        />
      )
    );

    return (
      <div className="Palette">
        <Navbar
          changeLevel={this.changeLevel}
          level={this.state.level}
          changeColourFormat={this.changeColourFormat}
        />
        <div className="Palette-colours">{colourBoxes}</div>
        <PaletteFooter
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}
