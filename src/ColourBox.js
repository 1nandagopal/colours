import { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./ColourBox.css";
import { Link } from "react-router-dom";

export default class ColourBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copyOverlay: false };
    this.changeCopyOverlayState = this.changeCopyOverlayState.bind(this);
  }
  changeCopyOverlayState() {
    this.setState({ copyOverlay: true }, () => {
      setTimeout(() => this.setState({ copyOverlay: false }), 1500);
    });
  }

  render() {
    const { copyOverlay } = this.state;
    const { name, background, id, paletteId } = this.props;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyOverlayState}>
        <div style={{ background }} className="ColourBox">
          <div
            style={{ background }}
            className={`copy-overlay ${copyOverlay && "show"}`}
          ></div>
          <div className={`copy-msg ${copyOverlay && "show"}`}>
            <h1>COPIED!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <Link to={this.props.moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className="see-more">More</span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}
