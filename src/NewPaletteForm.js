import { Component } from "react";
import classNames from "classnames";
import {
  Drawer,
  withStyles,
  Typography,
  Divider,
  IconButton,
  Button,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";
import DraggableColourList from "./DraggableColourList";
import PaletteFormNav from "./PaletteFormNav";
import ColourPickerForm from "./ColourPickerForm";
const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: "100vh",
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
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
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxNoOfColours: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colours: this.props.palettes[0].colours,
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addNewColour = this.addNewColour.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColour = this.removeColour.bind(this);
    this.clearColours = this.clearColours.bind(this);
    this.addRandomColour = this.addRandomColour.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  addNewColour(newColour) {
    this.setState({ colours: [...this.state.colours, newColour] });
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

  handleSubmit(newpalette) {
    newpalette.colours = this.state.colours;
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
    const { classes, maxNoOfColours, palettes } = this.props;
    const { open } = this.state;
    const isPaletteFull = this.state.colours.length >= maxNoOfColours;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
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
          <div className={classes.container}>
            <Typography variant="h5" gutterBottom>
              Design your palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColours}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColour}
                disabled={isPaletteFull}
                className={classes.button}
              >
                Random Colour
              </Button>
            </div>
            <ColourPickerForm
              isPaletteFull={isPaletteFull}
              colours={this.state.colours}
              addNewColour={this.addNewColour}
            />
          </div>
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
