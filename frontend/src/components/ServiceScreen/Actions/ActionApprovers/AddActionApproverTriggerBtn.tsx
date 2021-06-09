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
import UnsavedChangesAlert from "components/Common/UnsavedChangesAlert";
import ActionApproverForm from "components/Forms/Service/ActionApproverForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import { useUnsavedAlert } from "hooks/useUnsavedAlert";
import React, { FC, useCallback, useContext } from "react";
import { IActionApproverDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (actionId: number, OwnerMetaDataForm: IActionApproverDto[]) => Promise<void>;
};
const AddActionApproverTriggerBtn: FC<Props> = ({ submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currAction } = useContext(ServiceViewContext);
  const { t } = useLocales();
  const { setUnsavedChanges, alertOpen, setAlertOpen, unsavedChanged } = useUnsavedAlert();

  const handleSubmit = useCallback(async (OwnerMetaDataForm: IActionApproverDto[]) => {
    setUnsavedChanges(false);
    submitCallback(currAction.id, OwnerMetaDataForm);
  }, []);

  return (
    <>
      <PopoverMenuButton btnText={t("serviceScreen.actions.addApprovers")} onClickMethod={onOpen} />

      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (unsavedChanged) {
            setAlertOpen(true);
          } else onClose();
        }}
        scrollBehavior="inside"
        size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("serviceScreen.actions.addApproversHeader", { title: currAction.title })}
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
            <ActionApproverForm submitCallback={handleSubmit} />
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

export default AddActionApproverTriggerBtn;
