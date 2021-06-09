import { useColorModeValue } from "@chakra-ui/react";

// ignore due to implied typing is better suited for this kind of hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useColors = () => {
  const hoverBg = useColorModeValue("blue.200", "blue.700");
  const activeBg = useColorModeValue("yellow.200", "yellow.700");
  const menuBg = useColorModeValue("gray.100", "gray.700");
  const mainBg = useColorModeValue("gray.200", "gray.800");
  const appHeaderBg = useColorModeValue("purple.500", "purple.300");
  const serviceHeaderBg = useColorModeValue("orange.400", "orange.600");
  const overviewHeaderBg = useColorModeValue("blue.400", "blue.200");
  const appSecretBannerBg = useColorModeValue("red.400", "red.300");
  const starredColor = useColorModeValue("F0F342", "white");

  return {
    hoverBg,
    menuBg,
    activeBg,
    mainBg,
    appHeaderBg,
    serviceHeaderBg,
    overviewHeaderBg,
    appSecretBannerBg,
    starredColor
  };
};
