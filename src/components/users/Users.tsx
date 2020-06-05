import React, { useState, useEffect } from "react";
import {
  Image as ImageComponent,
  Item,
  Pagination,
  Header,
  Icon,
  Loader,
} from "semantic-ui-react";
import axios from "axios";
import { UserType } from "../../../appTypes&Interfaces";
import "./Users.css";
import UsersList from "./usersList/UsersList";

export const Users = () => {
  const [checkedItems, setCheckedItems] = useState<string>("None selected");
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);
  const [usersAmount, setUsersAmount] = useState(0);
  const [pages, setPages] = useState(0);
  const [skip, setSkip] = useState(0);
  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };

  useEffect(() => {
    const getUsers = async (limit: number, skip: number) => {
      setLoading(true);
      const res = await axios.get(
        `/api/users?limit=${limit}&skip=${skip}&gender=${checkedItems}`
      );
      setSkip(0)
      setUsers(res.data.users);
      setPages(res.data.pages);
      setUsersAmount(res.data.usersAmount);
      setLoading(false);
    };
    getUsers(limit, skip);
  }, [skip, limit, checkedItems]);

  const onPaginationHandler = (e: any) => {
    const value = +e.target.innerHTML;
    if (!isNaN(value)) {
      setSkip((value - 1) * limit);
    }
    if (e.target.type === "prevItem" && skip !== 0) {
      previousPage();
    } else if (e.target.type === "nextItem" && skip + limit !== pages * limit) {
      nextPage();
    }
  };

  const checkboxes = [
    { name: "None selected", key: "any" },
    { name: "male", key: "male" },
    { name: "female", key: "female" },
  ];

  const onValueChange = (event: any) => {
    setCheckedItems(event.target.value);
  };

  return (
    <>
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
      <UsersList users={users} loading={loading} />
      <Pagination
        onClick={onPaginationHandler}
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={pages}
      />
    </>
  );
};
