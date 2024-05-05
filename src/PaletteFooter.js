import { Component } from "react";

export default class PaletteFooter extends Component {
  render() {
    return (
      <footer className="Palette-footer">
        {this.props.paletteName}
        <span className="emoji">{this.props.emoji}</span>
      </footer>
    );
  }
}
