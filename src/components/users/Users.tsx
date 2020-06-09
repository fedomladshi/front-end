import React, { useState, useEffect } from "react";
import {
  Image as ImageComponent,
  Header,
  Icon,
  Loader,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import { UserType } from "../../../appTypes&Interfaces";
import "./Users.css";
import UsersList from "./usersList/UsersList";
import { PaginationComponent } from "./pagination/Pagination";

export const Users = () => {
  const [checkedItems, setCheckedItems] = useState<string>("None selected");
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [paginationRerender, setPaginationRerender] = useState(false);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [usersAmount, setUsersAmount] = useState(0);
  const [pages, setPages] = useState(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    setPaginationRerender(true);
  }, [checkedItems]);

  useEffect(() => {
    const getUsers = async (limit: number, skip: number) => {
      setLoading(true);
      const res = await axios.get(
        `/api/users?limit=${limit}&skip=${skip}&gender=${checkedItems}`
      );

      setUsersAmount(res.data.usersAmount);
      setPages(res.data.pages);
      setUsers(res.data.users);
      if (paginationRerender) {
        setSkip(0);
      }
      setPaginationRerender(false);
      setLoading(false);
    };
    getUsers(limit, skip);
  }, [skip, limit, checkedItems, paginationRerender]);

  const checkboxes = [
    { name: "None selected", key: "any" },
    { name: "male", key: "male" },
    { name: "female", key: "female" },
  ];

  const onValueChange = (event: any) => {
    setCheckedItems(event.target.value);
  };

  return (
    <section className="container">
      <Header as="h2" icon textAlign="center">
        <Icon name="users" circular />
        <Header.Content>People</Header.Content>
      </Header>
      <Header as="h3" block>
        Found users: {usersAmount}
        <div>
          <p>Gender</p>
          {checkboxes.map((item) => (
            <label key={item.key}>
              {item.name}
              <input
                type="radio"
                value={item.name}
                checked={checkedItems === item.name}
                onChange={onValueChange}
              />
            </label>
          ))}
        </div>
      </Header>
      <div className="users-list">
        {!paginationRerender ? (
          loading ? (
            <Loader active inline="centered" />
          ) : typeof users !== "string" ? (
            <UsersList users={users} />
          ) : (
            <Message floating>{users}</Message>
          )
        ) : (
          ""
        )}
      </div>
      {usersAmount ? (
        <PaginationComponent
          setSkip={setSkip}
          skip={skip}
          limit={limit}
          pages={pages}
        />
      ) : (
        ""
      )}
    </section>
  );
};
