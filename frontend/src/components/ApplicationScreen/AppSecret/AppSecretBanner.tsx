import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import { FC } from "react";

import GenerateAppSecretTriggerBtn from "./GenerateAppSecretTriggerBtn";

const AppSecretBanner: FC = () => {
  const { appSecretBannerBg } = useColors();
  const { t } = useLocales();
  return (
    <Box w="full" as="section" pb="12">
      <Stack
        direction={{ base: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        py="3"
        px={{ base: "3", md: "6", lg: "8" }}
        color="white"
        bg={appSecretBannerBg}>
        <Flex align="center">
          <Text fontWeight="medium" marginEnd="2">
            {t("applicationScreen.tokens.appSecret.appSecretWarningBar")}
          </Text>
          <GenerateAppSecretTriggerBtn />
        </Flex>
      </Stack>
    </Box>
  );
};

export default AppSecretBanner;
