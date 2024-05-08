import { Component } from "react";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColour: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colourNameInput: {
    width: "100%",
    height: "70px",
  },
};

class ColourPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColour: "teal", currentColourName: "" };
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrentColour = this.updateCurrentColour.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColourNameUnique", (value) =>
      this.props.colours.every(
        (colour) => colour.name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColourUnique", () =>
      this.props.colours.every(
        (colour) => colour.colour !== this.state.currentColour
      )
    );
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  updateCurrentColour(newColour) {
    this.setState({ currentColour: newColour.hex });
  }

  handleSubmit() {
    const newColour = {
      name: this.state.currentColourName,
      colour: this.state.currentColour,
    };
    this.props.addNewColour(newColour);
    this.setState({ currentColourName: "" });
  }

  render() {
    const { isPaletteFull, classes } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currentColour}
          onChangeComplete={this.updateCurrentColour}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={this.state.currentColourName}
            name="currentColourName"
            placeholder="Colour Name"
            onChange={this.handleChange}
            validators={["required", "isColourNameUnique", "isColourUnique"]}
            errorMessages={[
              "this field is required",
              "Colour Name is not unique",
              "Colour is not unique",
            ]}
            variant="filled"
            margin="normal"
            className={classes.colourNameInput}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isPaletteFull}
            className={classes.addColour}
            style={{
              backgroundColor: isPaletteFull
                ? "grey"
                : this.state.currentColour,
            }}
          >
            {isPaletteFull ? "Palette is Full" : "Add Colour"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColourPickerForm);
