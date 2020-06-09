import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppStateType } from "../../redux";
import { UserType, AuthReducerType } from "../../../appTypes&Interfaces";
import { Card, Icon, Image, Button, Modal, Header } from "semantic-ui-react";
import "./Dashboard.css";
import StatusWindow from "./statusWindow/statusWindow";
import { ModalDeleteComponent } from "../modalDeleteComponent/modalDeleteComponent";
import { updateUserAvatar, deleteUserAvatar } from "../../redux/actions/user.action";

interface IDashboard {
  user: UserType;
  auth: AuthReducerType;
}

const Dashboard: React.FC<IDashboard> = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isStatusWindow, setIsStatusWindow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [
    isVisibleDeleteAvatarButton,
    setIsVisibleDeleteAvatarButton,
  ] = useState(false);

  const updateAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    file && (await dispatch(updateUserAvatar(file)));
  };

  const removeAvatarHandler = async () => {
    await dispatch(deleteUserAvatar());
  };

  return (
    user && (
      <section className="container">
        <div className="dashboard">
          <Card>
            {isStatusWindow ? (
              <StatusWindow
                isStatusWindow={isStatusWindow}
                setIsStatusWindow={setIsStatusWindow}
              />
            ) : null}
            <div
              className="avatar-content"
              onMouseOver={() => setIsVisibleDeleteAvatarButton(true)}
              onMouseLeave={() => setIsVisibleDeleteAvatarButton(false)}
            >
              <div className="avatar-bg"></div>
              <div className="avatar-content__panel">
                <ModalDeleteComponent
                  removeAvatarHandler={removeAvatarHandler}
                  trigger={
                    <Icon
                      className={
                        isVisibleDeleteAvatarButton
                          ? "avatar-content__panel-btn-delete"
                          : "hide-btn"
                      }
                      name="delete"
                    />
                  }
                  message={"Are you sure you want to delete the avatar?"}
                />
              </div>

              <Modal
                trigger={
                  <Image
                    className="avatar-content__image"
                    src={user.avatar}
                    wrapped
                    title="Upload avatar"
                    ui={false}
                  />
                }
                basic
                size="small"
              >
                <Header content="Upload the avatar" />
                <form encType="multipart/form-data" onSubmit={updateAvatar}>
                  <p>
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files !== null) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                    <input type="submit" value="Загрузить" />
                  </p>
                </form>
              </Modal>
            </div>
            <Card.Content className="dashboard-main">
              <Button
                primary
                className="dashboard-main__edit-button"
                type="button"
                onClick={() => history.push("/edit")}
              >
                Edit
              </Button>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>
                <span className="date">
                  Joined in {user.createdAt.split("-")[0]}
                </span>
              </Card.Meta>
              <Card.Description
                className="dashboard-main__user-status"
                onClick={() => setIsStatusWindow((state) => !state)}
              >
                {user.status}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {user.friends
                  ? user.friends.length === 1
                    ? user.friends.length + " friend"
                    : user.friends.length + " friends"
                  : "You have no friends yet"}
              </a>
            </Card.Content>
          </Card>
        </div>
      </section>
    )
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps)(Dashboard);
