import React, { Component } from "react";
import List from "../components/List";
import Pagination from "../components/Pagination";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Pagination />
        <List />
      </div>
    );
  }
}

export default App;
