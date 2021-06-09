import { Box, Button, Td, Tr } from "@chakra-ui/react";
import ServiceLibraryDrawer from "components/ServiceLibrary/ServiceLibraryDrawer";
import { AppViewContext } from "contexts/AppViewContext";
import { useButtonSizes } from "hooks/useButtonSizes";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext, useState } from "react";
import { AppTokenIdDto, TokenStates } from "services/backend/nswagts";

import SeeTokenStatusDrawer from "./TokenStatus/SeeTokenStatusDrawer";

type Props = {
  token: AppTokenIdDto;
};
const TokenTableItem: FC<Props> = ({ token }) => {
  const { fetchUpdatedToken } = useContext(AppViewContext);
  const [libraryOpen, setOpen] = useState(false);
  const { defBtnSize } = useButtonSizes();
  const { t } = useLocales();

  return (
    <Tr>
      <Td maxW="100px">{token.tokenIdentifier}</Td>
      <Td>{token.description}</Td>
      <Td>
        <Box w="full">
          {token.state == TokenStates.Created && (
            <Button
              size={defBtnSize}
              w="full"
              colorScheme="blue"
              onClick={async () => {
                await fetchUpdatedToken(token.id);
                setOpen(true);
              }}>
              {t("applicationScreen.tokens.actions.browseServices")}
            </Button>
          )}
          {token.state == TokenStates.AwaitingReview && (
            <SeeTokenStatusDrawer
              buttonText={t("applicationScreen.tokens.actions.checkStatus")}
              submitOnOpen={() => fetchUpdatedToken(token.id)}
              submitOnClose={() => null}
            />
          )}
          {token.state == TokenStates.Reviewed && (
            <SeeTokenStatusDrawer
              buttonText={t("applicationScreen.tokens.actions.checkStatus")}
              submitOnOpen={() => fetchUpdatedToken(token.id)}
              submitOnClose={() => null}
            />
          )}
          {token.state == TokenStates.JwtReceived && (
            // <GetJwtTriggerBtn submitOnOpen={() => fetchUpdatedToken(token.id)} />
            <SeeTokenStatusDrawer
              buttonText={t("applicationScreen.tokens.actions.details")}
              submitOnOpen={() => fetchUpdatedToken(token.id)}
              submitOnClose={() => null}
            />
          )}
        </Box>

        <ServiceLibraryDrawer Open={libraryOpen} setOpen={setOpen} />
      </Td>
    </Tr>
  );
};
export default TokenTableItem;
