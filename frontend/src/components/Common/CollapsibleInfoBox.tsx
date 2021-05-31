import { Box, Button, Center, Collapse, Text } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import { FC, useState } from "react";
type Props = {
  text: string;
};
const CollapsibleInfoBox: FC<Props> = ({ text }) => {
  const [show, setShow] = useState(false);
  const { t } = useLocales();

  if (text.length < 150) {
    return <Text>{text}</Text>;
  }
  return (
    <Box>
      <Collapse startingHeight={70} in={show}>
        <Text fontSize="md">{text}</Text>
      </Collapse>
      <Center>
        <Button colorScheme="gray" size="sm" onClick={() => setShow(!show)} mt="1rem">
          {show ? t("commonButtons.showLess") : t("commonButtons.showMore")}
        </Button>
      </Center>
    </Box>
  );
};

export default CollapsibleInfoBox;
