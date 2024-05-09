import { Component } from "react";

import "./styles/page.css";

export default class Page extends Component {
  render() {
    return <section className="page">{this.props.children}</section>;
  }
}
