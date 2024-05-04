import { Component } from "react";
import { Link } from "react-router-dom";

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props;
    console.log(palettes);
    return (
      <div>
        <h1>React Colours</h1>
        {palettes.map((palette) => (
          <Link to={`/palette/${palette.id}`} key={palette.id}>
            {palette.paletteName}
          </Link>
        ))}
      </div>
    );
  }
}
