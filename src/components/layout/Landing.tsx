import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import { authReducerType } from "../../../appTypes&Interfaces";

interface ILanding {
  auth: authReducerType;
}

const Landing: React.FC<ILanding> = ({auth}) => {
  const buttons = (
    <div className="buttons">
      <Link to="/register" className="btn btn-primary">
        Sign Up
      </Link>
      <Link to="/login" className="btn btn-light">
        Login
      </Link>
    </div>
  );
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome to Fyrics</h1>
          <p className="lead">You'll find all for your ears here</p>
          {!auth.loading &&
            auth.isAuthenticated
              ? `Hello ${auth.user.name}`
              : buttons}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
