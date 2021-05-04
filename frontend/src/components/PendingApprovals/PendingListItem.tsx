import { Box, Flex, Spacer } from "@chakra-ui/react";
import CollapsibleInfoBox from "components/Common/CollapsibleInfoBox";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import ReviewTokenModalTrigger from "../Forms/ReviewAcces/ReviewTokenModalTrigger";

type Props = {
  appToken: AppTokenIdDto;
};

const PendingListItem: FC<Props> = ({ appToken }) => {
  if (appToken.appTokenActions.length == 0) return null;

  return (
    <Flex align="center" m="4" p="2" borderWidth="2px" borderRadius="lg">
      <Flex flexDirection="column">
        <Box>{`Token: ${appToken.tokenIdentifier}    with ${appToken.appTokenActions.length} actions`}</Box>
        <Box padding="2">
          <CollapsibleInfoBox text={appToken.description} />
        </Box>
      </Flex>
      <Spacer />
      <Box>
        <ReviewTokenModalTrigger token={appToken}></ReviewTokenModalTrigger>
      </Box>
    </Flex>
  );
};
export default PendingListItem;
