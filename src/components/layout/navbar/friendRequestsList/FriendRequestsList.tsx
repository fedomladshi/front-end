import React from "react";
import { Dropdown, Label, List } from "semantic-ui-react";
import { connect } from "react-redux";
import { AppStateType } from "../../../../redux";
import { FriendshipType, UserType } from "../../../../../appTypes&Interfaces";
import "./FriendRequestsList.css";
import PotentialFriend from "./potentialFriend/PotentialFriend";
import {
  denyFriendRequest,
  getAllFriendships,
} from "../../../../redux/actions/friendship.action";

// const friendOptions = [
//   {
//     key: 'Jenny Hess',
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
//   },
//   {
//     key: 'Elliot Fu',
//     text: 'Elliot Fu',
//     value: 'Elliot Fu',
//     image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
//   },
//   {
//     key: 'Stevie Feliciano',
//     text: 'Stevie Feliciano',
//     value: 'Stevie Feliciano',
//     image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
//   },
// ]

type MapStateToProps = {
  friendship: Array<FriendshipType>;
  user: UserType;
};

type MapDispatchToProps = {
  denyFriendRequest: (friendId: string) => void;
  getAllFriendships: () => void;
};

type Props = MapStateToProps & MapDispatchToProps;

const DropdownFriendRequests: React.FC<Props> = ({
  friendship,
  user,
  denyFriendRequest,
  getAllFriendships,
}) => {
  const requestsCount = friendship.filter(
    (item) => item.recipient._id === user._id
  );
  return (
    <>
      <Label className="friends-label" color="teal" floating>
        {requestsCount ? requestsCount.length : "0"}
      </Label>
      <Dropdown
        text="Friend requests"
        icon="user"
        floating
        labeled
        button
        className="icon"
      >
        <Dropdown.Menu>
          {friendship.map(({ recipient, requester }) =>
            recipient._id === user._id ? (
              <List key={recipient._id} divided verticalAlign="middle">
                <PotentialFriend
                  src={recipient.avatar}
                  name={requester.name}
                  friendId={requester._id}
                  denyFriendRequest={denyFriendRequest}
                  getAllFriendships={getAllFriendships}
                />
              </List>
            ) : (
              ""
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  user: state.user,
  friendship: state.friendship,
});
export default connect<MapStateToProps, MapDispatchToProps, {}, AppStateType>(
  mapStateToProps,
  {
    denyFriendRequest,
    getAllFriendships
  }
)(DropdownFriendRequests);
