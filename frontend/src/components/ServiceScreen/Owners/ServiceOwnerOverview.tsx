import { Box, Heading, Tag, VStack } from "@chakra-ui/react";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { IServiceOwnerIdDto } from "services/backend/nswagts";

const ServiceOwnerOverview: FC = () => {
  const { serviceOwners, currService } = useContext(ServiceViewContext);
  const { t } = useLocales();

  if (currService == null) return null;
  return (
    <VStack align="left">
      <Heading size="h4">
        {t("entityNames.single.service")} {t("entityNames.plural.owners")}:
      </Heading>
      <Box>
        {serviceOwners.map((owner: IServiceOwnerIdDto) => (
          <Tag m="5px" key={owner.id}>
            {owner.email}
          </Tag>
        ))}
      </Box>
    </VStack>
  );
};

export default ServiceOwnerOverview;
