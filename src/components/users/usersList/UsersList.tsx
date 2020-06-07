import React from "react";
import { Item, Button } from "semantic-ui-react";
import { UserType } from "../../../../appTypes&Interfaces";
import "./UsersList.css";
import { AppStateType } from "../../../store";
import { connect } from "react-redux";

type Props = {
  users: Array<UserType>;
  skip: number;
  friends: Array<string>;
};

const UsersList: React.FC<Props> = ({ users, friends }) => {
  console.log("friends: ", friends);
  return (
    <Item.Group link>
      {users.map((user: UserType) => {
        return (
          <Item key={user.email} className="user-card">
            <Item.Image size="tiny" src={user.avatar} />

            <Item.Content>
              <Item.Header>{user.name}</Item.Header>
              <Item.Description>
                <div>
                  {user.status === "set a status message" ? "" : user.status}
                </div>
                <div className="date">
                  Joined in {user.createdAt.split("-")[0]}
                </div>
              </Item.Description>
            </Item.Content>
            <Item.Content className="user-card__button">
              {friends.map((friend) => {
                return friend === user._id ? (
                  <Button>Remove from friends</Button>
                ) : (
                  <Button>Add to friends</Button>
                );
              })}
            </Item.Content>
          </Item>
        );
      })}
    </Item.Group>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  friends: state.user.friends,
});
export default connect(mapStateToProps)(UsersList);
