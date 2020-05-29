import React from "react";
import { Modal } from "semantic-ui-react";
import "./modalComponent.css";

interface IModalComponent {
  isVisible: boolean;
  message: string;
}
export const ModalComponent: React.FC<IModalComponent> = ({
  isVisible,
  message,
}) => {
  return (
    <Modal open={isVisible} basic size="small">
      <Modal.Content>
        <h1 className="modal-title">{message}</h1>
      </Modal.Content>
    </Modal>
  );
};
