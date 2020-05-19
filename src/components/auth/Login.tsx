import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";

type formDataType = {
  email: string;
  password: string;
};
const Login = (props: any) => {
  let setFormInitialState: formDataType = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(setFormInitialState);

  const { email, password } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("1")
    props.loginUser({ email, password });
  };

  // Redirect of logged in

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onsubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength={6}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
