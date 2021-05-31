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
  useDisclosure
} from "@chakra-ui/react";
import NotificationBellWithCounter from "components/Common/NotificationBellWithCounter";
import PendingList from "components/ServiceScreen/PendingApprovals/PendingList";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext } from "react";
const NotificationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pendingTokens } = useContext(ServiceViewContext);
  const { t } = useLocales();

  return (
    <>
      <NotificationBellWithCounter counter={pendingTokens.length} submitOnClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("serviceScreen.pendingTokens.header")}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <PendingList />
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
export default NotificationTriggerBtn;
