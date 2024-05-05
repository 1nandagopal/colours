import { Component } from "react";
import { Route, Switch } from "react-router-dom";

import SeedColours from "./SeedColours";
import { generatePalette } from "./colourHelpers";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColourPalette from "./SingleColourPalette";

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
          render={(routeProps) => (
            <PaletteList palettes={SeedColours} {...routeProps} />
          )}
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

        <Route
          exact
          path="/palette/:paletteId/:colourId"
          render={(routeProps) => (
            <SingleColourPalette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              colourId={routeProps.match.params.colourId}
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
