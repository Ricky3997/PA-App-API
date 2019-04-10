import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./components/App.js";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { getUser, logout, updateUser } from "./actions/actionCreator";
import store from "./store/configureStore";
import * as ReactGA from "react-ga";


const ReduxApp = connect(({ user, app }) => {
  return { user, app };
}, dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user)),
    refreshUser: () => dispatch(getUser())
  };
})(App);

ReactGA.initialize("UA-137517000-1");
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={ReduxApp}/>
    </Router>
  </Provider>,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
