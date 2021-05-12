import { Box, Button, Center } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import React, { FC } from "react";
import { IUser, User } from "services/backend/nswagts";

import UserListItem from "./UserListItem";

const maxResults = 7;
type Props = {
  users: IUser[];
  submitCallback: (user: IUser) => void;
  keyword: string;
};
const UserList: FC<Props> = ({ users, submitCallback, keyword }) => {
  const { hoverBg } = useColors();

  return (
    <Box height="full" width="full" justify="center">
      {users.slice(0, maxResults).map((user: User) => (
        <Center p="1px" key={user.primaryEmail}>
          <Button
            w="full"
            rounded="none "
            fontSize="14px"
            fontWeight="normal"
            variant="ghost"
            _hover={{
              bgColor: hoverBg
            }}
            onClick={() => {
              submitCallback(user);
            }}>
            <UserListItem keyword={keyword} user={user} />
          </Button>
        </Center>
      ))}
    </Box>
  );
};

export default UserList;
