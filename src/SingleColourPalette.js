import { Component } from "react";
import ColourBox from "./ColourBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  colours: {
    height: "90%",
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
    },
  },
};

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
    const { palette, classes } = this.props;
    const colourBoxes = this.shades.map((colour) => (
      <ColourBox
        name={colour.name}
        background={colour[this.state.colourFormat]}
        key={colour.name}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={`${classes.Palette}`}>
        <Navbar level={false} changeColourFormat={this.changeColourFormat} />
        <div className={classes.colours}>
          {colourBoxes}
          <div className={`${classes.goBack}`}>
            <Link to={`/palette/${palette.id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={palette.paletteName}
          emoji={palette.emoji}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColourPalette);
