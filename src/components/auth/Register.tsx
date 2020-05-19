import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

import axios from "axios";

type formDataType = {
  name: string;
  email: string;
  password: string;
  password2: string;
};
const Register = (props: any) => {
  let setFormInitialState: formDataType = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [formData, setFormData] = useState(setFormInitialState);

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("passwords do not match", "danger");
    } else {
      props.register({ name, email, password });
    }
  };

  if(props.isAuthenticated) {
      return <Redirect to="/dashboard" />
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onsubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
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
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
