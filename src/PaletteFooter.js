import { Component } from "react";
import { withStyles } from "@material-ui/core";

import styles from "./styles/PaletteFooterStyles";

class PaletteFooter extends Component {
  render() {
    const { classes, paletteName } = this.props;
    return (
      <footer className={classes.PaletteFooter}>
        {paletteName}
        <span className={classes.emoji}>{this.props.emoji}</span>
      </footer>
    );
  }
}

export default withStyles(styles)(PaletteFooter);
