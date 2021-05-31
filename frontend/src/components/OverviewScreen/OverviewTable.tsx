import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import {
  AppOverviewDto,
  IAppOverviewDto,
  IServiceOverviewDto,
  ServiceOverviewDto
} from "services/backend/nswagts";

import OverviewTableItem from "./OverviewTableItem";

type Props = {
  tableData: IAppOverviewDto[] | IServiceOverviewDto[];
  tableHeading: string;
};
const OverviewTable: FC<Props> = ({ tableData, tableHeading }) => {
  const { t } = useLocales();
  return (
    <Box>
      <Heading mb="10" size="h3">
        {tableHeading}:
      </Heading>

      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th w={0.4}>{t("entityVariables.name")}</Th>
            <Th w={0.6}>{t("entityVariables.identifier")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((e: AppOverviewDto | ServiceOverviewDto) => (
            <OverviewTableItem key={e.id} item={e} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OverviewTable;
