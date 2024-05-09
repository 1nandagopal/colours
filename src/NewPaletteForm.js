import { Component } from "react";
import classNames from "classnames";
import {
  Drawer,
  Typography,
  Divider,
  IconButton,
  Button,
  withStyles,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";

import DraggableColourList from "./DraggableColourList";
import PaletteFormNav from "./PaletteFormNav";
import ColourPickerForm from "./ColourPickerForm";
import seedColours from "./seedColours";
import styles from "./styles/newPaletteFormStyles";

class NewPaletteForm extends Component {
  static defaultProps = {
    maxNoOfColours: 20,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colours: seedColours[0].colours,
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

    let randColour, isDuplicateColour;
    do {
      randColour = allColours[Math.floor(Math.random() * allColours.length)];
      isDuplicateColour = this.state.colours.some(
        (colour) => colour.colour === randColour.colour
      );
    } while (isDuplicateColour);

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
    const isPaletteFull = this.state.colours.length >= maxNoOfColours;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={this.state.open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
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
            [classes.contentShift]: this.state.open,
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
