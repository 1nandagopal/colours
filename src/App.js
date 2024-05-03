import { Component } from "react";
import Palette from "./Palette";
import SeedColours from "./SeedColours";
import { generatePalette } from "./colourHelpers";

export default class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(SeedColours[4])} />
      </div>
    );
  }
}
