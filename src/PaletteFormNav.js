import { PureComponent } from "react";
import classNames from "classnames";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/paletteFormNavStyles";

class PaletteFormNav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paletteNameFormOpen: false,
    };

    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showForm() {
    this.setState({ paletteNameFormOpen: true });
  }

  hideForm() {
    this.setState({ paletteNameFormOpen: false });
  }

  render() {
    const { classes, open, palettes, handleDrawerOpen, handleSubmit } =
      this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create Custom Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.showForm}
            >
              Save Palette
            </Button>
          </div>
        </AppBar>
        {this.state.paletteNameFormOpen && (
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            handleClose={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
