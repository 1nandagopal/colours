import { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import ColourBox from "./ColourBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColourPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { colourFormat: "hex" };

    this.changeColourFormat = this.changeColourFormat.bind(this);
    this.shades = this.gatherShades(this.props.palette, this.props.colourId);
  }

  gatherShades(palette, colourId) {
    let shades = [];
    let allColours = palette.colours;
    for (let key in allColours) {
      shades = shades.concat(
        allColours[key].filter((colour) => colour.id === colourId)
      );
    }
    return shades.slice(1);
  }

  changeColourFormat(newFormat) {
    this.setState({ colourFormat: newFormat });
  }

  render() {
    const { palette, classes } = this.props;
    const colourBoxes = this.shades.map((colour) => (
      <ColourBox
        name={colour.name}
        background={colour[this.state.colourFormat]}
        key={colour.name}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={`${classes.Palette}`}>
        <Navbar level={false} changeColourFormat={this.changeColourFormat} />
        <div className={classes.colours}>
          {colourBoxes}
          <div className={`${classes.goBack}`}>
            <Link to={`/palette/${palette.id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColourPalette);
