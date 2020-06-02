import React, { Fragment, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from '../../actions/auth.action'
import { setAlert } from "../../actions/alert";
import { AppStateType } from "../../store";
import axios from "axios";

type formDataType = {
  name: string;
  email: string;
  password: string;
  password2?: string;
};

interface IRegister {
  setAlert: (msg: string, type: string) => void;
  register: (payload: boolean) => void;
}
const Register: React.FC<IRegister> = ({ setAlert, register }) => {
  let setFormInitialState: formDataType = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(setFormInitialState);

  const history = useHistory();
  const { name, email, password, password2 } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      setLoading(true);
      try {
        await axios.post("/api/auth", { name, email, password });
        register(true);
        history.push("/login");
      } catch (err) {
        console.log(err.response.data);
        setAlert(err.response.data, "danger");
      }
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <Form loading={loading} onSubmit={onsubmit}>
        <Form.Input
          label="Name"
          placeholder="enter your name"
          value={name}
          onChange={onChange}
          name="name"
        />
        <Form.Input
          label="Email"
          placeholder="enter your email"
          value={email}
          onChange={onChange}
          name="email"
        />
        <Form.Input
          label="Password"
          placeholder="enter your password"
          value={password}
          onChange={onChange}
          name="password"
          minLength={6}
        />
        <Form.Input
          label="confirm password"
          placeholder="enter your password again"
          value={password2}
          onChange={onChange}
          name="password2"
          minLength={6}
        />
        <Button primary>Register</Button>
      </Form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
