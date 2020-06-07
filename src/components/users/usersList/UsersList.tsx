import React from "react";
import { Item } from "semantic-ui-react";
import { UserType } from "../../../../appTypes&Interfaces";
import "./UsersList.css";
import { AppStateType } from "../../../store";
import { connect } from "react-redux";
import { addToFriends, removeFromFriends } from "../../../actions/user.action";
import { ButtonPanel } from "./buttonPanel/buttonPanel";

type OwnPropsType = {
  users: Array<UserType>;
};
type MapStateToPropsType = {
  friends: Array<string>;
};
type MapDispatchPropsType = {
  addToFriends: (id: string) => void;
  removeFromFriends: (id: string) => void;
};

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

const UsersList: React.FC<PropsType> = ({
  users,
  friends,
  addToFriends,
  removeFromFriends,
}) => {
  const addToFriendsHandler = async (friendId: string) => {
    await addToFriends(friendId);
  };

  const removeFromFriendsHandler = async (friendId: string) => {

    await removeFromFriends(friendId);
  };

  return (
    <Item.Group link>
      {users.map((user: UserType) => {
        const isFriend = friends.find((friend) => friend === user._id);
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
              {user._id === isFriend ? (
                <ButtonPanel
                  userId={user._id}
                  text="Remove from friends"
                  addToFriendsHandler={addToFriendsHandler}
                  removeFromFriendsHandler={removeFromFriendsHandler}
                />
              ) : (
                <ButtonPanel
                  userId={user._id}
                  text="Add to friends"
                  addToFriendsHandler={addToFriendsHandler}
                  removeFromFriendsHandler={removeFromFriendsHandler}
                />
              )}
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
export default connect<
  MapStateToPropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, { addToFriends, removeFromFriends })(UsersList);
