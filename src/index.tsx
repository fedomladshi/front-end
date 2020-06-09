import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import store from "./redux";

import { setAuthToken } from "./utils/setAuthToken";
setAuthToken();

ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
