import React from "react";
import { Modal, Header, Icon, Button } from "semantic-ui-react";
import "./modalDeleteComponent.css";

interface IModalComponent {
  trigger: any;
  message: string;
  removeAvatarHandler: () => void
}
export const ModalDeleteComponent: React.FC<IModalComponent> = ({
  trigger,
  message,
  removeAvatarHandler
}) => {
  return (
    <Modal trigger={trigger} basic size="small">
      <Header icon="trash" content="Delete the avatar" />
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={() => removeAvatarHandler()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
