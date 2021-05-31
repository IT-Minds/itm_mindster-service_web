import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";
import ColorModeToggler from "components/Common/ColorModeToggler";
import LanguageSelector from "components/Common/LanguageSelector";
import MLogo from "components/Common/MLogo";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { SignalRContext } from "contexts/SignalRContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { FC, useContext, useEffect } from "react";

import NotificationTriggerBtn from "./PendingApprovals/NotificationTriggerBtn";
import SelectServiceTriggerBtn from "./Service/SelectServiceTriggerBtn";

const ServiceHeader: FC = () => {
  const { serviceHeaderBg } = useColors();
  const { fetchPendingTokens } = useContext(ServiceViewContext);
  const { connection } = useContext(SignalRContext);
  const { t } = useLocales();

  useEffect(() => {
    connection
      .start()
      .then(() => console.log(`SignalR connection started on ${connection.baseUrl}`))
      .catch(err => console.log("Error connecting SignalR :" + err));

    connection.on("TokensUpdated", () => {
      console.log("Received TokenUpdated and fetchedPendingTokens");
      fetchPendingTokens();
    });
  }, [fetchPendingTokens]);

  return (
    <Flex
      h="70px"
      px={["5px", "5px", "50px", "50px"]}
      bgColor={serviceHeaderBg}
      align="center"
      width="full">
      <MLogo />
      <Box ml="5px">
        <SelectServiceTriggerBtn />
      </Box>
      <Spacer />
      <Box mr="2px">
        <NotificationTriggerBtn />
      </Box>
      <LanguageSelector />
      <ColorModeToggler />
      <Box ml="2px" alignContent="end" justifyContent="right">
        <Link href="/ApplicationScreen">
          <Button rightIcon={<BsArrowRight />} colorScheme="purple">
            {t("serviceScreen.buttons.toAppPage")}
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default ServiceHeader;
