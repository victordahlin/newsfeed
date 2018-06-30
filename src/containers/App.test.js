import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("../components/List", () => {
  const List = () => <div />;
  return List;
});

jest.mock("../components/Pagination", () => {
  const Pagination = () => <div />;
  return Pagination;
});

describe("app component", () => {
  it("should render app component without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
