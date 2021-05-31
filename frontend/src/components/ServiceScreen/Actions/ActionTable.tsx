import { Heading, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { ActionIdDto } from "services/backend/nswagts";

import ActionTableItem from "./ActionTableItem";

const ActionTable: FC = () => {
  const { currService } = useContext(ServiceViewContext);
  const { t } = useLocales();

  if (currService == null) return null;
  if (currService.actions.length == 0) return null;
  return (
    <VStack w="full" align="left">
      <Heading size="h3">{t("entityNames.plural.actions")}:</Heading>
      <Table borderWidth="1px" variant="striped" colorScheme="gray" size="sm">
        <Thead>
          <Tr>
            <Th maxW={0.3}>{t("entityVariables.title")}</Th>
            <Th w={0.6}>{t("entityVariables.description")}</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {currService.actions.map((action: ActionIdDto) => (
            <ActionTableItem key={action.id} action={action} />
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default ActionTable;
