import { Component } from "react";
import { SortableContainer } from "react-sortable-hoc";

import DraggableColourBox from "./DraggableColourBox";

class DraggableColourList extends Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        {this.props.colours.map((colour, i) => (
          <DraggableColourBox
            index={i}
            key={colour.name}
            colour={colour.colour}
            name={colour.name}
            handleClick={() => this.props.removeColour(colour.name)}
          />
        ))}
      </div>
    );
  }
}

export default SortableContainer(DraggableColourList);
