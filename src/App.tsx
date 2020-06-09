import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/layout/navbar/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import EditUser from "./components/editUser/EditUser";
import { loadUser } from "./redux/actions/auth.action";
import { Users } from "./components/users/Users";
import { Segment, Loader, Dimmer } from "semantic-ui-react";
import { AppStateType } from "./redux";
import "./App.css";
import { userLoaded } from "./redux/actions/user.action";
import { UserType } from "../appTypes&Interfaces";
import {getAllFriendships} from './redux/actions/friendship.action'

type MapStateToProps = {
  user: UserType;
};

type MapDispatchToProps = {
  loadUser: () => any;
  userLoaded: (data: UserType) => void;
  getAllFriendships: () => void
};

type Props = MapStateToProps & MapDispatchToProps;

const App: React.FC<Props> = ({ user, loadUser, userLoaded, getAllFriendships }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await loadUser();
      await userLoaded(data);
      await getAllFriendships()
    })();
    setLoading(false);
  }, [loadUser, userLoaded, getAllFriendships]);

  return (
    <Fragment>
      <Navbar />
      <Segment>
        <Dimmer active={loading} inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
        <Route exact path="/" component={Landing} />
        <Alert />
        <Switch>
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/edit" component={EditUser} />
          <PrivateRoute exact path="/users" component={Users} />
        </Switch>
      </Segment>
    </Fragment>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  user: state.user,
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
  mapStateToProps,
  { loadUser, userLoaded, getAllFriendships}
)(App);
