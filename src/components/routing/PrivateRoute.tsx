import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import { IRouteProps } from "../../../appTypes&Interfaces";

const PrivateRoute = ({ component: Component, auth, ...rest }: IRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !auth.isAuthenticated && !auth.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
