import { Component } from "react";
import ColourBox from "./ColourBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";

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
    const colourBoxes = this.shades.map((colour) => (
      <ColourBox
        name={colour.name}
        background={colour[this.state.colourFormat]}
        key={colour.name}
        showingFullPalette={false}
      />
    ));
    console.log(this.shades);
    return (
      <div className="SingleColourPalette Palette">
        <Navbar level={false} changeColourFormat={this.changeColourFormat} />
        <div className="Palette-colours">
          {colourBoxes}
          <div className="go-back ColourBox">
            <Link
              to={`/palette/${this.props.palette.id}`}
              className="back-button"
            >
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={this.props.palette.paletteName}
          emoji={this.props.palette.emoji}
        />
      </div>
    );
  }
}

export default SingleColourPalette;
