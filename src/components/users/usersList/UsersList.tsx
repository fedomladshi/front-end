import React from "react";
import { Item, Loader, Button } from "semantic-ui-react";
import { UserType } from "../../../../appTypes&Interfaces";
import "./UsersList.css";
import { connect } from "react-redux";
import { AppStateType } from "../../../store";

type OwnProps = {
  users: Array<UserType>;
  loading: boolean;
};

type MapStataToProps = {
  stateUser: UserType;
};

type Props = OwnProps & MapStataToProps;

const UsersList: React.FC<Props> = ({ users, loading, stateUser }) => {
  return (
    <div className="users-list">
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <Item.Group link>
          {users.map((user: UserType) => {
            return (
              <Item key={user.email} className="user-card">
                <Item.Image size="tiny" src={user.avatar} />

                <Item.Content>
                  <Item.Header>{user.name}</Item.Header>
                  <Item.Description>
                    <div>
                      {user.status === "set a status message"
                        ? ""
                        : user.status}
                    </div>
                    <div className="date">
                      Joined in {user.createdAt.split("-")[0]}
                    </div>
                  </Item.Description>
                </Item.Content>
                <Item.Content className="user-card__button">
                  <Button>Add</Button>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      )}
    </div>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  stateUser: state.user,
});

export default connect<MapStataToProps, {}, OwnProps, AppStateType>(
  mapStateToProps
)(UsersList);
