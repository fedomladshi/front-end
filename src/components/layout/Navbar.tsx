import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.action";
import { AppStateType } from "../../store";
import { authReducerType, userType } from "../../../appTypes&Interfaces";
import { Dropdown } from "semantic-ui-react";

interface ILanding {
  auth: authReducerType;
  user: userType;
  logout: () => void;
}

const Navbar: React.FC<ILanding> = ({ auth, user, logout }) => {
  const authLinks = user && (
    <Dropdown text={user.name}>
      <Dropdown.Menu>
        <Dropdown.Item text="My profile" />
        <Dropdown.Divider />
        <Dropdown.Item text="Edit" />
        <Dropdown.Divider />
        <Dropdown.Item text="Log out" onClick={logout} />
      </Dropdown.Menu>
    </Dropdown>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/music">Music</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> Fyrics
        </Link>
      </h1>
      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
