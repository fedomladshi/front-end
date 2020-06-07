import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import { AuthReducerType } from "../../../appTypes&Interfaces";
import { Button } from "semantic-ui-react";

interface ILanding {
  auth: AuthReducerType;
}

const Landing: React.FC<ILanding> = ({ auth }) => {
  const buttons = (
    <Button.Group>
      <Link to="/register">
        <Button>Sign Up</Button>
      </Link>
      <Button.Or />
      <Link to="/login">
        <Button positive>Login</Button>
      </Link>
    </Button.Group>
  );
  return (
    <section className="landing">
        <div className="landing-inner">
          <h1 className="x-large">Welcome to Fyrics</h1>
          <p className="lead">You'll find all for your ears here</p>
          {!auth.loading && auth.isAuthenticated
            ? `Hello ${auth.user.name}`
            : buttons}
        </div>
    </section>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
