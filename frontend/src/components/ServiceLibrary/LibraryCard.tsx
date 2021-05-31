import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import { BsPencilSquare } from "@react-icons/all-files/bs/BsPencilSquare";
import RequestActions from "components/Forms/RequestActions/RequestActions";
import MarkdownViewer from "components/Markdown/MarkdownViewer";
import { AppViewContext } from "contexts/AppViewContext";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext, useEffect, useState } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};

const LibraryCard: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currToken } = useContext(AppViewContext);
  const [existingActions, setExistingActions] = useState<number[]>([]);
  const { t } = useLocales();

  useEffect(() => {
    if (currToken) {
      setExistingActions(
        currToken.appTokenActions
          .filter(e => e.action.serviceId == service.id)
          .map(element => {
            return element.actionId;
          })
      );
    }
  }, [currToken]);

  return (
    <>
      <Flex
        direction="column"
        overflow="hidden"
        onClick={onOpen}
        cursor="pointer"
        _hover={{
          bgColor: hoverBg
        }}
        w="250px"
        h="200px"
        shadow="xl"
        borderWidth="1px"
        borderRadius="lg"
        p="3">
        <Heading fontSize="xl">{service.title}</Heading>
        <Spacer />
        <Heading mt="6" fontSize="md">
          {service.serviceIdentifier}
        </Heading>
        <Spacer />
        <Heading mt="6" fontSize="sm">
          {t("applicationScreen.serviceLibrary.amountOfActions", { x: service.actions.length })}
        </Heading>
        <Spacer />
        {existingActions.length != 0 && (
          <Flex mt="6" align="center">
            <Heading fontSize="sm">
              {t("applicationScreen.serviceLibrary.requested", {
                x: existingActions.length,
                y: service.actions.length
              })}
            </Heading>
            <Box ml="2px">
              <BsPencilSquare />
            </Box>
          </Flex>
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("entityNames.single.service")}: {service.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Container w="5xl" maxW="full">
                <MarkdownViewer value={service.description} />
                <RequestActions
                  submitCallBack={() => onClose()}
                  service={service}
                  existingActions={existingActions}></RequestActions>
              </Container>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default LibraryCard;
