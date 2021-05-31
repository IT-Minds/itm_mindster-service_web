import { Box, Flex, Spacer } from "@chakra-ui/react";
import CollapsibleInfoBox from "components/Common/CollapsibleInfoBox";
import ReviewTokenModalTrigger from "components/Forms/ReviewAcces/ReviewTokenModalTrigger";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

type Props = {
  appToken: AppTokenIdDto;
};

const PendingListItem: FC<Props> = ({ appToken }) => {
  const { t } = useLocales();
  if (appToken.appTokenActions.length == 0) return null;

  return (
    <Flex align="center" m="4" p="2" borderWidth="2px" borderRadius="lg">
      <Flex flexDirection="column">
        <Box>
          {t("serviceScreen.pendingTokens.cardTitle", {
            identifier: appToken.tokenIdentifier,
            count: appToken.appTokenActions.length
          })}
        </Box>
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
