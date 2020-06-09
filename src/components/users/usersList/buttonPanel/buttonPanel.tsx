import React, { useState } from "react";
import { Button } from "semantic-ui-react";

type Props = {
  text: string;
  addToFriendsHandler: (id: string) => void;
  removeFromFriendsHandler: (id: string) => void;
  userId: string;
};
export const ButtonPanel: React.FC<Props> = ({
  text,
  addToFriendsHandler,
  removeFromFriendsHandler,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(text);
  return (
    <Button
      loading={loading}
      onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.name === "Add to friends") {
          setLoading(true);
          await addToFriendsHandler(userId);
          setButtonText("Remove from friends");
          setLoading(false);
        } else {
          setLoading(true);
          await removeFromFriendsHandler(userId);
          setButtonText("Add to friends");
          setLoading(false);
        }
      }}
      name={buttonText}
    >
      {buttonText}
    </Button>
  );
};
