import { Component } from "react";
import { Route, Switch } from "react-router-dom";

import seedColours from "./seedColours";
import { generatePalette } from "./colourHelpers";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColourPalette from "./SingleColourPalette";
import NewPaletteForm from "./NewPaletteForm";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { palette: seedColours };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palette.find((palette) => palette.id === id);
  }

  savePalette(newPalette) {
    this.setState({ palette: [...this.state.palette, newPalette] });
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={this.state.palette} {...routeProps} />
          )}
        />

        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm savePalette={this.savePalette} {...routeProps} />
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
      //   <Palette palette={generatePalette(seedColours[4])} />
      // </div>
    );
  }
}
