import { Component } from "react";
import ColourBox from "./ColourBox";

class SingleColourPalette extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const colourBoxes = this.shades.map((colour) => (
      <ColourBox
        name={colour.name}
        background={colour.hex}
        key={colour.name}
        showLink={false}
      />
    ));
    console.log(this.shades);
    return (
      <div className="Palette">
        <h1>Single Colour Palette</h1>
        <div className="Palette-colours">{colourBoxes}</div>
      </div>
    );
  }
}

export default SingleColourPalette;
