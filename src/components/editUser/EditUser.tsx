import React, { useState } from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../store";
import { UserType, AuthReducerType } from "../../../appTypes&Interfaces";
import { Header, Icon, Button, Form } from "semantic-ui-react";
import "./EditUser.css";
import { editUser, editUserFormDataType } from "../../actions/user.action";

interface IDashboard {
  user: UserType;
  auth: AuthReducerType;
  editUser: (obj: editUserFormDataType) => void;
}
type formDataType = {
  name: string;
  gender: string;
  relationship: string;
  hometown: string;
};
const EditUser: React.FC<IDashboard> = ({ user, editUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const genderOptions = [
    { key: "none", text: "None selected", value: "None selected" },
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
  ];
  const relationshipOptions = [
    { key: "none", text: "None selected", value: "None selected" },
    { key: "single", text: "Single", value: "Single" },
    { key: "inARel", text: "In a relationship", value: "In a relationship" },
    { key: "engaged", text: "Engaged", value: "Engaged" },
    { key: "married", text: "Married", value: "Married" },
    {
      key: "inACivilUnion",
      text: "In a civil union",
      value: "In a civil union",
    },
    { key: "inLove", text: "In love", value: "In love" },
    { key: "complicated", text: "It's complicated", value: "It's complicated" },
    {
      key: "searching",
      text: "Actively searching",
      value: "Actively searching",
    },
  ];

  let initialFormData: formDataType = {
    name: user.name,
    gender: user.gender,
    relationship: user.relationship,
    hometown: user.hometown,
  };
  const [formData, setFormData] = useState(initialFormData);

  const onChangeHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await editUser(formData);
    setIsLoading(false);
  };

  return (
    <section className="container">
      <Header as="h2">
        <Icon name="settings" />
        <Header.Content>
          Account Settings
          <Header.Subheader>Manage your basic info</Header.Subheader>
        </Header.Content>
      </Header>
      <Form loading={isLoading} onSubmit={onSubmitHandler}>
        <Form.Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
        />
        <div className="field">
          <label>Gender</label>
          <select
            name="gender"
            className="ui selection dropdown"
            value={formData.gender}
            onChange={onChangeHandler}
          >
            {genderOptions.map((option) => {
              return (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        <div className="field">
          <label>Relationship</label>
          <select
            name="relationship"
            className="ui selection dropdown"
            value={formData.relationship}
            onChange={onChangeHandler}
          >
            {relationshipOptions.map((option) => {
              return (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              );
            })}
          </select>
        </div>
        <Form.Input
          label="Hometown"
          name="hometown"
          value={formData.hometown}
          onChange={onChangeHandler}
        />
        <Button>Save</Button>
      </Form>
    </section>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { editUser })(EditUser);
