import { Component } from "react";
import classNames from "classnames";
import {
  CssBaseline,
  Drawer,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { arrayMove } from "react-sortable-hoc";
import DraggableColourList from "./DraggableColourList";

const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxNoOfColours: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newColourName: "",
      colour: "teal",
      colours: this.props.palettes[0].colours,
      newPaletteName: "",
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.updateColour = this.updateColour.bind(this);
    this.addNewColour = this.addNewColour.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColour = this.removeColour.bind(this);
    this.clearColours = this.clearColours.bind(this);
    this.addRandomColour = this.addRandomColour.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColourNameUnique", (value) =>
      this.state.colours.every(
        (colour) => colour.name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColourUnique", (value) =>
      this.state.colours.every((colour) => colour.colour !== this.state.colour)
    );

    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  updateColour(newColour) {
    this.setState({ colour: newColour.hex });
  }

  addNewColour() {
    const newColour = {
      name: this.state.newColourName,
      colour: this.state.colour,
    };
    this.setState({ colours: [...this.state.colours, newColour] }, () => {
      this.setState({ newColourName: "" });
    });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  removeColour(colourName) {
    this.setState({
      colours: this.state.colours.filter(
        (colour) => colour.name !== colourName
      ),
    });
  }

  handleSubmit() {
    let paletteName = this.state.newPaletteName;
    const newpalette = {
      paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "✅",
      colours: this.state.colours,
    };

    this.props.savePalette(newpalette);
    this.props.history.push("/");
  }

  clearColours() {
    this.setState({ colours: [] });
  }

  addRandomColour() {
    const allColours = this.props.palettes.flatMap(
      (palette) => palette.colours
    );

    let randColour;

    do {
      randColour = allColours[Math.floor(Math.random() * allColours.length)];
      console.log(
        randColour,
        this.state.colours.some((colour) => colour.colour === randColour.colour)
      );
    } while (
      this.state.colours.some((colour) => colour.colour === randColour.colour)
    );

    this.setState({
      colours: [
        ...this.state.colours,
        allColours[Math.floor(Math.random() * allColours.length)],
      ],
    });
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ colours }) => ({
      colours: arrayMove(colours, oldIndex, newIndex),
    }));
  }

  render() {
    const { classes, maxNoOfColours } = this.props;
    const { newColourName, newPaletteName, open } = this.state;
    const isPaletteFull = this.state.colours.length >= maxNoOfColours;
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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette Name is required",
                  "Name already used",
                ]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design your palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColours}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColour}
              disabled={isPaletteFull}
            >
              Random Colour
            </Button>
          </div>
          <ChromePicker
            color={this.state.colour}
            onChangeComplete={this.updateColour}
          />
          <ValidatorForm onSubmit={this.addNewColour}>
            <TextValidator
              value={newColourName}
              name="newColourName"
              onChange={this.handleChange}
              validators={["required", "isColourNameUnique", "isColourUnique"]}
              errorMessages={[
                "this field is required",
                "Colour Name is not unique",
                "Colour is not unique",
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isPaletteFull}
              style={{
                backgroundColor: isPaletteFull ? "grey" : this.state.colour,
              }}
            >
              {isPaletteFull ? "Palette is Full" : "Add Colour"}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <DraggableColourList
            colours={this.state.colours}
            removeColour={this.removeColour}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
