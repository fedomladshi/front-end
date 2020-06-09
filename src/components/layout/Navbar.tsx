import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth.action";
import { exitUser } from "../../redux/actions/user.action";
import { AppStateType } from "../../redux";
import { AuthReducerType, UserType } from "../../../appTypes&Interfaces";
import { Dropdown, Menu } from "semantic-ui-react";

interface ILanding {
  auth: AuthReducerType;
  user: UserType;
  logout: () => void;
  exitUser: () => void;
}

const Navbar: React.FC<ILanding> = ({ auth, user, logout, exitUser }) => {
  const history = useHistory();

  const authLinks = user && (
    <div className="navbar__auth-links">
      <Menu.Item>
        <Link to="/users">users</Link>
      </Menu.Item>
      <Menu.Item>
        <Dropdown text={user.name}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="My profile"
              onClick={() => history.push("/dashboard")}
            />
            <Dropdown.Divider />
            <Dropdown.Item text="Edit" onClick={() => history.push("/edit")} />
            <Dropdown.Divider />
            <Dropdown.Item
              text="Log out"
              onClick={() => {
                logout();
                exitUser();
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
  const guestLinks = (
    <>
      <Menu.Item name="Sign up">
        <Link to="/register">Sign up </Link>
      </Menu.Item>

      <Menu.Item name="sign-in">
        <Link to="/login">Log-in</Link>
      </Menu.Item>
    </>
  );
  return (
    <Menu stackable>
      <Menu.Item>
        <img src="https://bower.io/img/bower-logo.png" alt="web-logo" />
      </Menu.Item>

      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Menu>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { logout, exitUser })(Navbar);
