import { Component } from "react";
import ColourBox from "./ColourBox";
import { withStyles } from "@mui/styles";

import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

import styles from "./styles/PaletteStyles";

class Palette extends Component {
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
    const { palette, classes } = this.props;
    const colourBoxes = palette.colours[this.state.level].map((colour) => (
      <ColourBox
        background={colour[this.state.colourFormat]}
        name={colour.name}
        moreUrl={`/palette/${palette.id}/${colour.id}`}
        showingFullPalette
        key={colour.id}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          changeLevel={this.changeLevel}
          level={this.state.level}
          changeColourFormat={this.changeColourFormat}
        />
        <div className={classes.colours}>{colourBoxes}</div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
