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
import PopoverMenuButton from "components/Common/PopoverMenuButton";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext } from "react";
import { IActionApproverIdDto } from "services/backend/nswagts";

import ActionApproverOverview from "./ActionApproverOverview";

type Props = {
  approvers: IActionApproverIdDto[];
};

const ViewActionApproversTriggerBtn: FC<Props> = ({ approvers }) => {
  const { currAction } = useContext(ServiceViewContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocales();

  return (
    <>
      <PopoverMenuButton
        btnText={t("serviceScreen.actions.viewApprovers")}
        onClickMethod={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("serviceScreen.actions.viewApproversHeader", { title: currAction.title })}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionApproverOverview approvers={approvers} />
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

export default ViewActionApproversTriggerBtn;
