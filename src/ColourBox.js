import { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@mui/styles";

import styles from "./styles/ColourBoxStyles";

class ColourBox extends Component {
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
    const { name, background, classes, showingFullPalette } = this.props;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyOverlayState}>
        <div style={{ background }} className={classes.ColourBox}>
          <div
            style={{ background }}
            className={`${classes.copyOverlay} ${
              copyOverlay && classes.showOverlay
            }`}
          ></div>
          <div
            className={`${classes.copyMessage} ${
              copyOverlay && classes.showMessage
            }`}
          >
            <h1>COPIED!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colourName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={this.props.moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColourBox);
