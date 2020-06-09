import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, register } from "../../redux/actions/auth.action";
import { AppStateType } from "../../redux";
import { LoginFormDataType, UserType } from "../../../appTypes&Interfaces";
import { ModalComponent } from "../modalComponent/modalComponent";
import { loadUser } from "../../redux/actions/user.action";


type MapStateToProps = {
  isAuthenticated: boolean;
  registrationMessage: boolean;
  user: UserType;
}

type MapDispatchToProps = {
  loginUser: (obj: LoginFormDataType) => any;
  register: (payload: boolean) => void;
  loadUser: (payload: UserType) => void
}

type Props = MapStateToProps & MapDispatchToProps;

const Login: React.FC<Props> = ({
  isAuthenticated,
  registrationMessage,
  user,
  loginUser,
  register,
  loadUser
}) => {
  let setFormInitialState: LoginFormDataType = {
    email: "qwerty@mail.ru",
    password: "qwerty",
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(setFormInitialState);

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const user = await loginUser({ email, password });
    loadUser(user);
    setLoading(false);
  };

  useEffect(() => {
    let timeout: null | NodeJS.Timeout = null;
    if (registrationMessage) {
      timeout = setTimeout(() => {
        register(false);
      }, 3500);
    }
    return () => clearTimeout(timeout!);
  }, [registrationMessage, register]);

  if (isAuthenticated && Object.keys(user).length !== 0) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="container">
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
        <Button primary>Login</Button>
      </Form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuthenticated: state.auth.isAuthenticated,
  registrationMessage: state.auth.registrationMessage,
  user: state.user,
});

export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(mapStateToProps, { loginUser, register, loadUser })(Login);
