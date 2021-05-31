import { Box, Center, Flex, Wrap } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

import RequestActionList from "./RequestActionList";

type Props = {
  service: ServiceIdDto;
  submitCallBack?: () => void;
  existingActions: number[];
};

const RequestActions: FC<Props> = ({ service, submitCallBack, existingActions }) => {
  const { t } = useLocales();
  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex direction="column" width="full" align="center" justifyContent="center">
          <Box mt="10px" width="full" justifyContent="left" fontWeight="semibold" fontSize="lg">
            {t("applicationScreen.serviceLibrary.requestAccessExplain")}
          </Box>
          <Box width="full" p={6}>
            <RequestActionList
              submitCallBack={submitCallBack}
              tableData={service.actions}
              existingActions={existingActions}
              service={service}
            />
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default RequestActions;
