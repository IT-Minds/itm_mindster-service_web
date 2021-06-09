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
import UnsavedChangesAlert from "components/Common/UnsavedChangesAlert";
import ActionForm from "components/Forms/Action/ActionForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import { useUnsavedAlert } from "hooks/useUnsavedAlert";
import React, { FC, useCallback, useContext } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { ActionDto, CreateActionCommand } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

const CreateActionTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService, setNewCurrService } = useContext(ServiceViewContext);
  const { t } = useLocales();
  const toast = useToast();
  const { alertOpen, setAlertOpen, unsavedChanged } = useUnsavedAlert();

  const createAction = useCallback(
    async (metaData: ActionDto) => {
      const client = await genServiceClient();
      try {
        await client.createAction(
          currService.id,
          new CreateActionCommand({
            action: new ActionDto({
              title: metaData.title,
              description: metaData.description,
              adminNote: metaData.adminNote,
              actionIdentifier: convertToIdentifier(metaData.title)
            })
          })
        );

        toast({
          description: t("toasts.xCreated", { x: t("entityNames.single.action") }),
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `${t("toasts.xCreatedE", {
            x: t("entityNames.single.action")
          })} ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        setNewCurrService(currService.id);
        onClose();
      }
    },
    [currService]
  );

  if (currService == null) return null;
  return (
    <>
      <Button onClick={onOpen} rightIcon={<BsPlus />} colorScheme="green">
        {t("serviceScreen.buttons.createNewAction")}
      </Button>

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
          <ModalHeader> {t("serviceScreen.modalHeaders.addAction")}</ModalHeader>
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
            <ActionForm submitCallback={createAction} />
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
export default CreateActionTriggerBtn;
