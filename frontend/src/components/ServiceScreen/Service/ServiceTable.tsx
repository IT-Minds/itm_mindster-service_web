import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";
import { IServiceIdDto, ServiceIdDto } from "services/backend/nswagts";

import ServiceTableItem from "./ServiceTableItem";

type Props = {
  services: IServiceIdDto[];
};
const ServiceTable: FC<Props> = ({ services }) => {
  const { t } = useLocales();

  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th w={0.49}>{t("entityVariables.name")}</Th>
          <Th w={0.49}>{t("entityVariables.identifier")}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {services.map((service: ServiceIdDto) => (
          <ServiceTableItem key={service.id} service={service}></ServiceTableItem>
        ))}
      </Tbody>
    </Table>
  );
};

export default ServiceTable;
