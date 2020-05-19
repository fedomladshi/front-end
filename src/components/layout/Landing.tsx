import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Landing = (props: any) => {
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
          <h1 className="x-large">Main page</h1>
          <p className="lead">Authentication practice</p>
          {!props.auth.loading &&
            props.auth.isAuthenticated
              ? `Hello ${props.auth.user.name}`
              : buttons}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
