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
import ActionApproverForm from "components/Forms/Service/ActionApproverForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext } from "react";
import { IActionApproverDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (actionId: number, OwnerMetaDataForm: IActionApproverDto[]) => Promise<void>;
};
const AddActionApproverTriggerBtn: FC<Props> = ({ submitCallback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currAction } = useContext(ServiceViewContext);
  const { t } = useLocales();

  const handleSubmit = useCallback(async (OwnerMetaDataForm: IActionApproverDto[]) => {
    submitCallback(currAction.id, OwnerMetaDataForm);
  }, []);

  return (
    <>
      <PopoverMenuButton btnText={t("serviceScreen.actions.addApprovers")} onClickMethod={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("serviceScreen.actions.addApproversHeader", { title: currAction.title })}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <ActionApproverForm submitCallback={handleSubmit} />
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

export default AddActionApproverTriggerBtn;
