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
    this.state = {
      palettes: JSON.parse(localStorage.getItem("palettes")) || seedColours,
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id);
  }

  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }

  deletePalette(id) {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((palette) => palette.id !== id),
      }),
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList
              palettes={this.state.palettes}
              deletePalette={this.deletePalette}
              {...routeProps}
            />
          )}
        />

        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              palettes={this.state.palettes}
              savePalette={this.savePalette}
              {...routeProps}
            />
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
    );
  }
}
