import { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";

import "./ColourBox.css";

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
    const { name, background, showLink } = this.props;
    const isDarkColour = chroma(background).luminance() <= 0.075;
    const isLightColour = chroma(background).luminance() >= 0.65;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyOverlayState}>
        <div style={{ background }} className="ColourBox">
          <div
            style={{ background }}
            className={`copy-overlay ${copyOverlay && "show"}`}
          ></div>
          <div className={`copy-msg ${copyOverlay && "show"}`}>
            <h1>COPIED!</h1>
            <p className={isLightColour && "dark-text"}>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColour && "light-text"}>{name}</span>
            </div>
            <button className={`copy-button ${isLightColour && "dark-text"}`}>
              Copy
            </button>
          </div>
          {showLink && (
            <Link to={this.props.moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={`see-more ${isLightColour && "dark-text"}`}>
                MORE
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
