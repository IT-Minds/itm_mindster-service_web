import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { ApplicationIdDto, IApplicationIdDto } from "services/backend/nswagts";

import AppTableItem from "./AppTableItem";

type Props = {
  applications: IApplicationIdDto[];
};

const AppTable: FC<Props> = ({ applications }) => {
  // const { applications } = useContext(AppViewContext);
  const { t } = useLocales();
  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th w={0.49}>{t("entityVariables.title")}</Th>
          <Th w={0.49}>{t("entityVariables.identifier")}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {applications.map((application: ApplicationIdDto) => (
          <AppTableItem key={application.id} application={application}></AppTableItem>
        ))}
      </Tbody>
    </Table>
  );
};

export default AppTable;
