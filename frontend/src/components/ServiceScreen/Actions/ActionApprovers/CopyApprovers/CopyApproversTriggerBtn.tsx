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
import PopoverMenuButton from "components/Common/PopoverMenuButton";
import UnsavedChangesAlert from "components/Common/UnsavedChangesAlert";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import { useUnsavedAlert } from "hooks/useUnsavedAlert";
import React, { FC, useCallback, useContext } from "react";
import { IActionApproverDto } from "services/backend/nswagts";

import ActionApproverOverview from "../ActionApproverOverview";
import CopyActionList from "./CopyActionsList";

type Props = {
  approversToCopy: IActionApproverDto[];
  submitCallback: (actionId: number, OwnerMetaDataForm: IActionApproverDto[]) => Promise<void>;
};
const CopyApproverTriggerBtn: FC<Props> = ({ approversToCopy, submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService, currAction } = useContext(ServiceViewContext);
  const { t } = useLocales();
  const { alertOpen, setAlertOpen, unsavedChanged } = useUnsavedAlert();

  const handleSubmit = useCallback(
    async (actionIds: number[]) => {
      actionIds.forEach(async actionId => {
        await submitCallback(actionId, approversToCopy);
      });
      onClose();
    },
    [approversToCopy]
  );

  return (
    <>
      <PopoverMenuButton
        btnText={t("serviceScreen.actions.copyApproversToAnotherAction")}
        onClickMethod={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (unsavedChanged) {
            setAlertOpen(true);
          } else onClose();
        }}
        scrollBehavior="inside"
        size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("serviceScreen.actions.copyApproversHeader", { title: currAction.title })}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <UnsavedChangesAlert
              isOpen={alertOpen}
              setIsOpen={setAlertOpen}
              onClick={() => {
                onClose();
              }}
            />
            <ActionApproverOverview approvers={approversToCopy} />
            <Box p="3">
              <CopyActionList
                tableData={currService.actions.filter(e => e.id != currAction.id)}
                submitCallback={handleSubmit}
              />
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (unsavedChanged) {
                  setAlertOpen(true);
                } else onClose();
              }}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CopyApproverTriggerBtn;
