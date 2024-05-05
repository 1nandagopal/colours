import { Component } from "react";

class SingleColourPalette extends Component {
  render() {
    console.log(this.props.match.params);
    return <h1>Siingle Colour Palette</h1>;
  }
}

export default SingleColourPalette;
