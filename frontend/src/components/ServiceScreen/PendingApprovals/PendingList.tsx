import { Box, Center, Container, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import React, { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import PendingListItem from "./PendingListItem";

const PendingList: FC = () => {
  const { pendingTokens } = useContext(ServiceViewContext);

  return (
    <Center>
      <Container w="6xl" maxW="unset">
        <VStack>
          <Box w="full">
            {pendingTokens.map((appToken: AppTokenIdDto) => (
              <PendingListItem key={appToken.id} appToken={appToken}></PendingListItem>
            ))}
          </Box>
        </VStack>
      </Container>
    </Center>
  );
};

export default PendingList;
