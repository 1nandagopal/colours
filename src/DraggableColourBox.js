import { withStyles } from "@material-ui/core";
import { Component } from "react";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
  },
};

class DraggableColourBox extends Component {
  render() {
    const { classes, colour } = this.props;
    return (
      <div className={classes.root} style={{ backgroundColor: colour.colour }}>
        {colour.name}
      </div>
    );
  }
}

export default withStyles(styles)(DraggableColourBox);
