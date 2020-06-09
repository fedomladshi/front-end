import React from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux";

type Props = {
  denyFriendRequestHandler: () => void;
};

export const ButtonPanelToFriendRequest: React.FC<Props> = ({
  denyFriendRequestHandler,
}) => {
  return (
    <>
      <Button size="mini" primary>
        Accept
      </Button>
      <Button onClick={denyFriendRequestHandler} size="mini">
        Cancel
      </Button>
    </>
  );
};

export default ButtonPanelToFriendRequest;
