import React from "react";
import { render } from "react-dom";

import App from "./App";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Parcel && Babel demo" };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ name: "Parcel package..." });
    }, 2000);
  }

  render() {
    return <App name={this.state.name} />;
  }
}

render(<AppContainer />, document.getElementById("app"));
