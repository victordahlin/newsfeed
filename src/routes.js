import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./containers/App";
import Post from "./components/Post";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/post/:id" component={Post} />
      </Switch>
    </BrowserRouter>
  );
};
