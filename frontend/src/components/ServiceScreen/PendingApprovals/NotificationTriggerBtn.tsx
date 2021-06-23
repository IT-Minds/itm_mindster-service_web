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
import React, { FC, useContext } from "react";
const NotificationTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pendingTokens } = useContext(ServiceViewContext);

  return (
    <>
      <NotificationBellWithCounter counter={pendingTokens.length} submitOnClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pending actions </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <PendingList />
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default NotificationTriggerBtn;
