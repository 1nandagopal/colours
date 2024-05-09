import { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

import styles from "./styles/ColourBoxStyles";

class ColourBox extends Component {
  constructor(props) {
    super(props);

    this.state = { copyOverlay: false };
    this.changeCopyOverlayState = this.changeCopyOverlayState.bind(this);
  }

  changeCopyOverlayState() {
    this.setState({ copyOverlay: true }, () => {
      setTimeout(() => this.setState({ copyOverlay: false }), 1000);
    });
  }

  render() {
    const { name, background, classes, showingFullPalette, moreUrl } =
      this.props;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyOverlayState}>
        <div style={{ background }} className={classes.ColourBox}>
          <div
            style={{ background }}
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: this.state.copyOverlay,
            })}
          ></div>
          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: this.state.copyOverlay,
            })}
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
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColourBox);
