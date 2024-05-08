import { Component } from "react";
import { Button } from "@material-ui/core";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
    const { isPaletteFull } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currentColour}
          onChangeComplete={this.updateCurrentColour}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={this.state.currentColourName}
            name="currentColourName"
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

export default ColourPickerForm;
