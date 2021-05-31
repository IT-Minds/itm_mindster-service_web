import { Center, Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

import TokenTableItem from "./TokenTableItem";

const TokenTable: FC = () => {
  const { appTokens } = useContext(AppViewContext);
  const { t } = useLocales();

  if (appTokens.length == 0) return null;
  return (
    <VStack w="full" align="left">
      <Heading size="h3">{t("entityNames.plural.tokens")}</Heading>
      <Table borderWidth="1px" variant="striped" colorScheme="gray" size="sm">
        <Thead>
          <Tr>
            <Th w={0.3}>{t("entityVariables.identifier")}</Th>
            <Th w={0.6}>{t("entityVariables.description")}</Th>
            <Th>
              <Center>{t("entityNames.plural.actions")}</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {appTokens.map((token: AppTokenIdDto) => (
            <TokenTableItem key={token.id} token={token} />
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default TokenTable;
