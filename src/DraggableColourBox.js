import { Component } from "react";
import { withStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";

import styles from "./styles/draggableColourBoxStyles";

class DraggableColourBox extends Component {
  render() {
    const { classes, colour, name, handleClick } = this.props;
    return (
      <div className={classes.root} style={{ backgroundColor: colour }}>
        <div className={classes.boxContent}>
          <span> {name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SortableElement(DraggableColourBox));
