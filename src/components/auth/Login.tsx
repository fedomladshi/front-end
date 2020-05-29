import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, register } from "../../actions/auth.action";
import { AppStateType } from "../../store";
import { loginFormDataType, userType } from "../../../appTypes&Interfaces";
import { ModalComponent } from "../modalComponent/modalComponent";

interface ILogin {
  isAuthenticated: boolean;
  registrationMessage: boolean;
  user: userType;
  loginUser: (obj: loginFormDataType) => void;
  register: (payload: boolean) => void;
}

const Login: React.FC<ILogin> = ({
  isAuthenticated,
  registrationMessage,
  user,
  loginUser,
  register,
}) => {
  let setFormInitialState: loginFormDataType = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(setFormInitialState);

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await loginUser({ email, password });
    setLoading(false);
  };

  //now you can pass timer to another component

  // Redirect of logged in
  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null;
    if (registrationMessage) {
      timeout = setTimeout(() => {
        register(false);
      }, 3500);
    }
    return () => clearTimeout(timeout!);
  }, [registrationMessage, register]);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      {registrationMessage && (
        <ModalComponent
          isVisible={registrationMessage}
          message="User has been successfuly created!"
        />
      )}
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <Form loading={loading} onSubmit={onsubmit}>
        <Form.Input
          label="Email"
          placeholder="enter your email"
          value={email}
          onChange={onChange}
          name="email"
        />
        <Form.Input
          label="Password"
          placeholder="enter your paword"
          value={password}
          onChange={onChange}
          name="password"
          minLength={6}
        />
        <Button>Login</Button>
      </Form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registrationMessage: state.auth.registrationMessage,
  user: state.user,
});

export default connect(mapStateToProps, { loginUser, register })(Login);
