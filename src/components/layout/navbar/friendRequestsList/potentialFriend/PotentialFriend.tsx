import React from "react";
import { Image, List } from "semantic-ui-react";
import { ButtonPanelToFriendRequest } from "../../../../buttonPanelToFriendRequest/buttonPanelToFriendRequest";

type Props = {
  friendId: string;
  src: string;
  name: string;
  denyFriendRequest: (friendId: string) => void;
  getAllFriendships: () => void;
};
const PotentialFriend: React.FC<Props> = ({
  src,
  name,
  friendId,
  denyFriendRequest,
  getAllFriendships
}) => {
  const denyFriendRequestHandler = async () => {
    await denyFriendRequest(friendId);
    await getAllFriendships();
  };

  return (
    <List.Item>
      <List.Content floated="right">
        <ButtonPanelToFriendRequest
          denyFriendRequestHandler={denyFriendRequestHandler}
        />
      </List.Content>
      <Image avatar src={src} />
      <List.Content>{name}</List.Content>
    </List.Item>
  );
};

export default PotentialFriend;
