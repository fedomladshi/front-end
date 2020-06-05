import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditUser from "./components/editUser/EditUser";
import { connect } from "react-redux";
import { loadUser } from "./actions/auth.action";
import PrivateRoute from "./components/routing/PrivateRoute";
import AudioPage from "./components/audioPage/audioPage";
import { Users } from "./components/users/Users";
import { Segment, Loader, Dimmer } from "semantic-ui-react";
import { AppStateType } from "./store";
import { UserType } from "../appTypes&Interfaces";

interface IApp {
  user: UserType;
  loadUser: () => void;
}
const App: React.FC<IApp> = ({ user, loadUser }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadUser();
    setLoading(false);
  }, [loadUser]);

  return (
    <Fragment>
      <Navbar />
      <Segment>
        <Dimmer active={loading} inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/Music" component={AudioPage} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit" component={EditUser} />
            <PrivateRoute exact path="/users" component={Users} />
          </Switch>
        </section>
      </Segment>
    </Fragment>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(App);
