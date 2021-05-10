/* eslint-disable jsx-a11y/no-autofocus */
// The popover of users shouldn't be auto focused since it stops the user from typing in search bar
// User should instead click a userCard if they want to.
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Popover, PopoverBody, PopoverContent } from "@chakra-ui/popover";
import { Tag } from "@chakra-ui/tag";
import { BsX } from "@react-icons/all-files/bs/BsX";
import React, { FC, useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genGoogleUserClient } from "services/backend/apiClients";
import { IUser } from "services/backend/nswagts";
import { logger } from "utils/logger";

import UserList from "./UserList";

type Props = {
  submitUsers: (users: IUser[]) => void;
};
const GoogleSearchBar: FC<Props> = ({ submitUsers }) => {
  const [keyword, setKeyword] = useState("");
  const [users, dispatchUsers] = useReducer(ListReducer<IUser>("primaryEmail"), []);
  const [addedUsers, dispatchAddedUsers] = useReducer(ListReducer<IUser>("primaryEmail"), []);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  const fetchGoogleUsers = useCallback(async () => {
    try {
      const client = await genGoogleUserClient();
      const data = await client.getAllUsers();

      if (data && data.length > 0)
        dispatchUsers({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("UserClient.getAllUsers got no data");
    } catch (err) {
      logger.warn("UserClient.getAllUsers Error", err);
    }
  }, []);

  useEffect(() => {
    fetchGoogleUsers();
  }, [fetchGoogleUsers]);

  // Tells parent component that the local userList has been changed
  useEffect(() => {
    submitUsers(addedUsers);
  }, [addedUsers]);

  const addUser = useCallback(
    (user: IUser) => {
      dispatchAddedUsers({
        type: ListReducerActionType.AddOrUpdate,
        data: user
      });
      setKeyword("");
    },
    [addedUsers]
  );
  const removeUser = useCallback(
    (user: IUser) => {
      dispatchAddedUsers({
        type: ListReducerActionType.Remove,
        data: user.primaryEmail
      });
    },
    [addedUsers]
  );
  // Filter useEffect based on keyword inputted in search field.
  useEffect(() => {
    if (keyword.length > 0 && users) {
      const timeOutId = setTimeout(() => {
        const filtered = users.filter(user => {
          return (
            user.name.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
            user.primaryEmail.toLowerCase().includes(keyword.toLowerCase())
          );
        });
        setFilteredUsers(filtered);
      }, 200);
      return () => clearTimeout(timeOutId);
    }
    if (keyword === "") setFilteredUsers([]);
  }, [keyword]);

  return (
    <>
      <Flex p="2px" borderRadius="lg" direction="column">
        <Box>
          {addedUsers.map(user => (
            <Tag borderRadius="full" m="5px" key={user.primaryEmail}>
              <Flex align="center">
                {user.name.fullName}
                <BsX cursor={"pointer"} onClick={() => removeUser(user)} />
              </Flex>
            </Tag>
          ))}
          <Input
            width="full"
            borderWidth="1px"
            value={keyword}
            placeholder={"Search for an It-Minds Employee"}
            onChange={e => setKeyword(e.target.value)}
          />
        </Box>
      </Flex>
      <Popover autoFocus={false} isOpen={filteredUsers.length != 0}>
        <PopoverContent>
          <PopoverBody px="0px">
            <UserList submitCallback={addUser} users={filteredUsers} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default GoogleSearchBar;
