import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import MarkdownTwoSplit from "components/Markdown/MarkdownTwoSplit";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateServiceCommand, ServiceDto } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

const CreateServiceTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setNewCurrService } = useContext(ServiceViewContext);
  const { t } = useLocales();
  const [value, setValue] = useState("# My Service\n");
  const toast = useToast();

  const addService = useCallback(async (title: string, description: string) => {
    const client = await genServiceClient();
    try {
      const serviceId = await client.createService(
        new CreateServiceCommand({
          service: new ServiceDto({
            title: title,
            description: description,
            serviceIdentifier: convertToIdentifier(title)
          })
        })
      );
      setNewCurrService(serviceId);
      toast({
        description: t("toasts.xCreated", { x: t("entityNames.single.service") }),
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `${t("toasts.xCreatedE", {
          x: t("entityNames.single.service")
        })} ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  }, []);

  return (
    <>
      <Button rightIcon={<BsPlus />} colorScheme="green" onClick={onOpen}>
        {t("serviceScreen.buttons.createNewService")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("serviceScreen.buttons.createNewService")}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <MarkdownTwoSplit value={value} onValueChange={setValue} onSave={addService} />
          </ModalBody>
          <Divider />
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

export default CreateServiceTriggerBtn;
