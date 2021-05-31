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
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ApplicationDto, CreateApplicationCommand } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

const CreateApplicationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setNewCurrApp } = useContext(AppViewContext);
  const [value, setValue] = useState("# My Application\n");
  const toast = useToast();
  const { t } = useLocales();

  const addApplication = useCallback(async (title: string, description: string) => {
    const applicationClient = await genApplicationClient();
    try {
      const appId = await applicationClient.createApplication(
        new CreateApplicationCommand({
          application: new ApplicationDto({
            title: title,
            description: description,
            appIdentifier: convertToIdentifier(title)
          })
        })
      );
      setNewCurrApp(appId);
      toast({
        description: t("toasts.xCreated", { x: t("entityNames.single.application") }),
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `${t("toasts.xCreatedE", {
          x: t("entityNames.single.application")
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
        {t("applicationScreen.buttons.createApp")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {t("applicationScreen.buttons.createApp")}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <MarkdownTwoSplit
              startTitle="my Application.md"
              value={value}
              onValueChange={setValue}
              onSave={addApplication}
            />
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

export default CreateApplicationTriggerBtn;
