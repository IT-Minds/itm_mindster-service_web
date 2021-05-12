import { Box, Flex as Flex, Image, Text } from "@chakra-ui/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { User } from "services/backend/nswagts";

type Props = {
  user: User;
  keyword: string;
};
const UserListItem: FC<Props> = ({ user, keyword }) => {
  const [nameMatches, setNameMatches] = useState<{ text: string; bold: boolean }[]>([]);
  const [emailMatches, setEmailMatches] = useState<{ text: string; bold: boolean }[]>([]);

  useEffect(() => {
    setNameMatches(findMatches(keyword, user.name.fullName));
    setEmailMatches(findMatches(keyword, user.primaryEmail));
  }, [keyword, user]);
  /**
   *Used to determine keyword is in a string and where it is. Returns array of substrings of @text
   *With a boolean telling if its bold or not. Bold if the substring matches keyword.
   */
  const findMatches = useCallback((keyword: string, text: string) => {
    const newMatches: { text: string; bold: boolean }[] = [];
    const word = text;
    const index = word.toUpperCase().indexOf(keyword.toUpperCase());
    switch (index) {
      case -1: // keyword not in text
        newMatches.push({ text: word + " ", bold: false });
        break;
      case 0: // keyword is at start of text
        newMatches.push({ text: word.slice(0, keyword.length), bold: true });
        newMatches.push({ text: word.slice(keyword.length) + " ", bold: false });
        break;
      case word.length - keyword.length: // keyword is the last part of text
        newMatches.push({ text: word.slice(0, index), bold: false });
        newMatches.push({ text: word.slice(index) + " ", bold: true });
        break;
      default:
        // keyword is in "the middle" of the text
        newMatches.push({ text: word.slice(0, index), bold: false });
        newMatches.push({ text: word.slice(index, index + keyword.length), bold: true });
        newMatches.push({ text: word.slice(index + keyword.length) + " ", bold: false });
        break;
    }
    return newMatches;
  }, []);

  if (!user || !user.name) return null;
  return (
    <Flex cursor={"pointer"} align="center" w="320px" h="50px">
      <Box ml="10px">
        <Image
          rounded="50%"
          boxSize="35px"
          src={user.thumbnailPhotoUrl}
          fallbackSrc="/images/silhouette-200x200.png"
        />
      </Box>
      <Flex py="3px" ml="10px" direction="column">
        <Flex>
          {nameMatches.map(o => (
            <Box key={nameMatches.indexOf(o)}>
              <Text fontWeight={o.bold ? "bold" : "normal"} whiteSpace="break-spaces">
                {o.text}
              </Text>
            </Box>
          ))}
        </Flex>
        <Flex>
          {emailMatches.map(o => (
            <Box key={emailMatches.indexOf(o)}>
              <Text fontWeight={o.bold ? "bold" : "normal"} fontSize="sm" whiteSpace="break-spaces">
                {o.text}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default UserListItem;
