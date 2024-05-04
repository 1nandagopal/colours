import { Component } from "react";
import Palette from "./Palette";
import SeedColours from "./SeedColours";
import { generatePalette } from "./colourHelpers";
import { Route, Switch } from "react-router-dom";
import PaletteList from "./PaletteList";

export default class App extends Component {
  findPalette(id) {
    return SeedColours.find((palette) => palette.id === id);
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <PaletteList palettes={SeedColours} />}
        />
        <Route
          exact
          path="/palette/:paletteId"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(SeedColours[4])} />
      // </div>
    );
  }
}
