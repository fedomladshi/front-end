import React, { useState } from "react";
import { Button } from "semantic-ui-react";

type Props = {
  theme: string;
  text: string;
  sendFriendRequestHandler: (id: string) => void;
  cancelFriendRequestHandler: (id: string) => void;
  userId: string;
};
export const ButtonPanel: React.FC<Props> = ({
  theme,
  text,
  sendFriendRequestHandler,
  cancelFriendRequestHandler,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [buttonTheme, setButtonTheme] = useState(false);
  const [buttonText, setButtonText] = useState(text);
  return (
    <Button
      primary={!buttonTheme ? (theme === "primary" ? true : false) : true}
      loading={loading}
      onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.name === "Add friend") {
          setLoading(true);
          await sendFriendRequestHandler(userId);
          setButtonText("Cancel request");
          setLoading(false);
        } else {
          setLoading(true);
          await cancelFriendRequestHandler(userId);
          setButtonTheme(true);
          setButtonText("Add friend");
          setLoading(false);
        }
      }}
      name={buttonText}
    >
      {buttonText}
    </Button>
  );
};
