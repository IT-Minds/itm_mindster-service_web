import { Center, Circle, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { BsFillBellFill } from "@react-icons/all-files/bs/BsFillBellFill";
import React, { FC } from "react";
type Props = {
  counter: number;
  submitOnClick: () => void;
};
const NotificationBellWithCounter: FC<Props> = ({ counter, submitOnClick }) => {
  return (
    <Flex
      rounded="md"
      cursor="pointer"
      _hover={{ bg: "gray.500" }}
      w="40px"
      h="40px"
      justify="right"
      direction="column"
      onClick={() => submitOnClick()}>
      <Flex visibility={counter == 0 ? "hidden" : "visible"}>
        <Spacer />
        <Circle mr="5px" bgColor="red" size="12px">
          <Text color="white" fontSize="x-small">
            {counter > 9 ? "+9" : counter}
          </Text>
        </Circle>
      </Flex>
      <Center>
        <Icon color="white" as={BsFillBellFill} />
      </Center>
    </Flex>
  );
};
export default NotificationBellWithCounter;
