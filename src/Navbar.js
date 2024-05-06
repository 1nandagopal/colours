import { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { withStyles } from "@mui/styles";
import { IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles/NavbarStyles";
// import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colourFormat: "hex",
      open: false,
    };
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
  }
  handleFormatChange(e) {
    this.setState({ colourFormat: e.target.value, open: true });
    this.props.changeColourFormat(e.target.value);
  }

  closeSnackBar() {
    this.setState({ open: false });
  }
  render() {
    const { level, changeLevel, classes } = this.props;

    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>

        {level && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChange={changeLevel}
              />
            </div>
          </div>
        )}

        <div className={classes.selectContainer}>
          <Select
            value={this.state.colourFormat}
            onChange={this.handleFormatChange}
          >
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={2000}
          message={
            <span id="message-id">
              Format Changed to {this.state.colourFormat.toUpperCase()}
            </span>
          }
          action={[
            <IconButton
              onClick={this.closeSnackBar}
              color="inherit"
              key="close"
              aria-label="close button"
            >
              <CloseIcon />
            </IconButton>,
          ]}
          onClose={this.closeSnackBar}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
        ></Snackbar>
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
