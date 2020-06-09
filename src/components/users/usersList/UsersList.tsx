import React from "react";
import { Item } from "semantic-ui-react";
import { UserType, FriendshipType } from "../../../../appTypes&Interfaces";
import "./UsersList.css";
import { AppStateType } from "../../../redux";
import { connect } from "react-redux";
import { ButtonPanel } from "./buttonPanel/buttonPanel";
import {
  sendFriendRequest,
  cancelFriendRequest,
  getAllFriendships,
} from "../../../redux/actions/friendship.action";
import { ButtonPanelToFriendRequest } from "../../buttonPanelToFriendRequest/buttonPanelToFriendRequest";

type OwnPropsType = {
  users: Array<UserType>;
};
type MapStateToPropsType = {
  friendship: Array<FriendshipType>;
  currentUser: UserType;
};
type MapDispatchPropsType = {
  sendFriendRequest: (friendId: string) => void;
  cancelFriendRequest: (friendId: string) => void;
  getAllFriendships: () => void;
};

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

const UsersList: React.FC<PropsType> = ({
  currentUser,
  users,
  friendship,
  sendFriendRequest,
  cancelFriendRequest,
  getAllFriendships,
}) => {
  const sendFriendRequestHandler = async (friendId: string) => {
    await sendFriendRequest(friendId);
  };

  const cancelFriendRequestHandler = async (friendId: string) => {
    await cancelFriendRequest(friendId);
    await getAllFriendships();
  };

  // const denyFriendRequestHandler = async () => {
  //   console.log("friendId: ", friendId);
  // };


  return (
    <Item.Group link>
      {users.map((user: UserType) => {
        const isRequested = friendship.find(
          ({recipient, requester }) =>
            recipient._id === user._id &&
            currentUser._id === requester._id
        );
        const isPending = friendship.find(
          ({recipient, requester }) =>
            recipient._id === currentUser._id &&
            user._id === requester._id
        );
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
              {isRequested && isRequested.status === "requested" ? (
                <ButtonPanel
                  theme="gray"
                  userId={user._id}
                  text="Cancel request"
                  sendFriendRequestHandler={sendFriendRequestHandler}
                  cancelFriendRequestHandler={cancelFriendRequestHandler}
                />
              ) : isPending && isPending.recipient._id === currentUser._id ? (
                // <ButtonPanelToFriendRequest denyFriendRequestHandler={denyFriendRequestHandler}/>
                <div></div>
              ) : (
                <ButtonPanel
                  theme="primary"
                  userId={user._id}
                  text="Add friend"
                  sendFriendRequestHandler={sendFriendRequestHandler}
                  cancelFriendRequestHandler={cancelFriendRequestHandler}
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
  friendship: state.friendship,
  currentUser: state.user,
});
export default connect<
  MapStateToPropsType,
  MapDispatchPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  sendFriendRequest,
  cancelFriendRequest,
  getAllFriendships,
})(UsersList);
