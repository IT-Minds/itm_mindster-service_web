import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext, useState } from "react";

import AppSecretResult from "./AppSecretResult";

const GenerateAppSecretTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, setNewCurrApp } = useContext(AppViewContext);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLocales();

  return (
    <Box>
      <Button w="max-content" colorScheme="green" onClick={onOpen}>
        {t("applicationScreen.tokens.appSecret.generateSecret")}
      </Button>

      <Modal
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("applicationScreen.modalHeaders.generateAppSecret")}</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <Divider />
          <ModalBody>
            <Box>
              <AppSecretResult
                currAppId={currApplication.id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                submitCallback={() => {
                  onClose();
                  setNewCurrApp(currApplication.id);
                }}
              />
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button isDisabled={isLoading} colorScheme="blue" mr={3} onClick={onClose}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GenerateAppSecretTriggerBtn;
