import { Flex, Spacer } from "@chakra-ui/react";
import ColorModeToggler from "components/Common/ColorModeToggler";
import LanguageSelector from "components/Common/LanguageSelector";
import MLogo from "components/Common/MLogo";
import { useColors } from "hooks/useColors";
import { FC } from "react";

const OverviewHeader: FC = () => {
  const { overviewHeaderBg } = useColors();

  return (
    <Flex
      h="70px"
      pl={["5px", "5px", "50px", "50px"]}
      pr={["5px", "5px", "50px", "50px"]}
      bgColor={overviewHeaderBg}
      align="center"
      width="full">
      <MLogo />
      <Spacer />
      <LanguageSelector />
      <ColorModeToggler />
    </Flex>
  );
};

export default OverviewHeader;
