import React, { Component } from "react";
import { SunspotLoader } from "react-awesome-loaders";
import "./Loader.scss";

class Loader extends Component {
  render() {
    return (
      <div className="loader">
          <SunspotLoader className="loader__animation" gradientColors={["#5ece7b", "teal"]} />
      </div>
    );
  }
}

export default Loader;
