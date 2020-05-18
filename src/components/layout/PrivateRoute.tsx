import React from "react";
import { Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component }: any, ...rest: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};
