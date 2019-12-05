import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // this.props.history.push("/detail/" + "2");
  }

  render() {
    return <div onClick={this.handleClick}>Home</div>;
  }
}

export default Home;
