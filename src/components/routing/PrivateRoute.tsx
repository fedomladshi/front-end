import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = (
  { component: Component }: any,
  auth: any,
  ...rest: any
) => {
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

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
