import { withStyles } from "@material-ui/core";
import { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0, 0, 0, 0.6)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
};

class DraggableColourBox extends Component {
  render() {
    const { classes, colour } = this.props;
    return (
      <div className={classes.root} style={{ backgroundColor: colour.colour }}>
        <div className={classes.boxContent}>
          <span> {colour.name}</span>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.props.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DraggableColourBox);
