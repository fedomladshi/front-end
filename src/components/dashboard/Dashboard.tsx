import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import { userType, authReducerType } from "../../../appTypes&Interfaces";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import "./Dashboard.css";
import StatusWindow from "./statusWindow/statusWindow";

interface IDashboard {
  user: userType;
  auth: authReducerType;
}

const Dashboard: React.FC<IDashboard> = ({ user }) => {
  const [isStatusWindow, setIsStatusWindow] = useState(false);
  return (
    user && (
      <div className="dashboard">
        <Card>
          {isStatusWindow ? (
            <StatusWindow
              isStatusWindow={isStatusWindow}
              setIsStatusWindow={setIsStatusWindow}
            />
          ) : null}
          <Image src={user.avatar} wrapped ui={false} />
          <Card.Content className="dashboard-main">
            <Button primary className="dashboard-main__edit-button" type="button">
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
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    )
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps)(Dashboard);
