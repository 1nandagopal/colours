import { Component } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Picker from "@emoji-mart/react";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }

  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      id: this.state.newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji.native,
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: "" });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.stage === "emoji"}
          onClose={this.props.handleClose}
        >
          <DialogTitle>Choose a palette emoji</DialogTitle>
          <Picker
            theme="light"
            onEmojiSelect={this.savePalette}
            onClickOutside={this.props.handleClose}
          />
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Enter Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please enter a unique name for your new custom palette
              </DialogContentText>

              <TextValidator
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                autoFocus
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette Name is required",
                  "Name already used",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
