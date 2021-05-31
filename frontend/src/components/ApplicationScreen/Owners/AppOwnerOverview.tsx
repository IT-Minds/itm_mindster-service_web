import { Box, Heading, Tag, VStack } from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import { FC, useContext } from "react";
import { ApplicationOwnerIdDto } from "services/backend/nswagts";

const AppOwnerOverview: FC = () => {
  const { appOwners, currApplication } = useContext(AppViewContext);
  const { t } = useLocales();

  if (currApplication == null) return null;
  return (
    <VStack align="left">
      <Heading size="h4">
        {t("entityNames.single.application")} {t("entityNames.plural.owners")}:
      </Heading>
      <Box>
        {appOwners.map((owner: ApplicationOwnerIdDto) => (
          <Tag m="5px" key={owner.id}>
            {owner.email}
          </Tag>
        ))}
      </Box>
    </VStack>
  );
};

export default AppOwnerOverview;
