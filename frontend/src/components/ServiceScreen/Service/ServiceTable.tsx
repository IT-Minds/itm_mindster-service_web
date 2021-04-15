import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { FC, useContext } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import ServiceTableItem from "./ServiceTableItem";

const ServiceTable: FC = () => {
  const { services } = useContext(ServiceViewContext);

  return (
    <Table size="sm" variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th w={0.49}>Name</Th>
          <Th w={0.49}>Identifier</Th>
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
