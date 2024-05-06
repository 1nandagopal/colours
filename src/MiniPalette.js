import { Component } from "react";
import { withStyles } from "@mui/styles";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends Component {
  render() {
    const { classes, paletteName, emoji, colours, id } = this.props;

    const miniColorBoxes = colours.map((colour) => (
      <div
        className={classes.miniColour}
        style={{ backgroundColor: colour.colour }}
        key={colour.name}
      />
    ));

    return (
      <div className={classes.root} onClick={() => this.props.goToPalette(id)}>
        <div className={classes.colours}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
