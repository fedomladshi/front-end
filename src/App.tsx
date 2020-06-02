import React, { Fragment, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditUser from "./components/editUser/EditUser";
// Redux
import { connect } from "react-redux";
import { setAuthToken } from "./utils/setAuthToken";
import { loadUser } from "./actions/auth.action";
import PrivateRoute from "./components/routing/PrivateRoute";
import AudioPage from "./components/audioPage/audioPage";

// if (localStorage.token) {
//   setAuthToken();
// }
const App = ({ loadUser }: any) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      {/* <Route exact path="/app" component={Landing2} /> */}
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/Music" component={AudioPage} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/edit" component={EditUser} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default connect(null, { loadUser })(App);
