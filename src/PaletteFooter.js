import { Component } from "react";
import styles from "./styles/PaletteFooterStyles";
import { withStyles } from "@mui/styles";

class PaletteFooter extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.PaletteFooter}>
        {this.props.paletteName}
        <span className={classes.emoji}>{this.props.emoji}</span>
      </footer>
    );
  }
}

export default withStyles(styles)(PaletteFooter);
