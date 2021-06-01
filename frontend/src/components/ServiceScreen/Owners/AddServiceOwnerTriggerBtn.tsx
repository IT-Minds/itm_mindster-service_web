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
import ServiceOwnerForm from "components/Forms/Service/ServiceOwnerForm";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import { useUnsavedAlert } from "hooks/useUnsavedAlert";
import React, { FC, useCallback, useContext } from "react";
import { genServiceClient } from "services/backend/apiClients";
import { CreateServiceOwnerCommand, ServiceOwnerDto } from "services/backend/nswagts";

const AddServiceOwnersTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchOwners, currService } = useContext(ServiceViewContext);
  const { t } = useLocales();
  const toast = useToast();
  const { setUnsavedChanges, alertOpen, setAlertOpen, unsavedChanged } = useUnsavedAlert();

  const addOwners = useCallback(
    async (form: ServiceOwnerDto[]) => {
      const client = await genServiceClient();
      try {
        await client.addServiceOwners(
          currService.id,
          new CreateServiceOwnerCommand({
            serviceOwners: form
          })
        );
        setUnsavedChanges(false);
        toast({
          description: t("toasts.xAdded", { x: t("entityNames.plural.owners") }),
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          description: `${t("toasts.xAddedE", {
            x: t("entityNames.plural.owners")
          })} ${error}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        onClose();
        fetchOwners();
      }
    },
    [currService, fetchOwners]
  );

  return (
    <>
      <Button onClick={onOpen} rightIcon={<BsPlus />} colorScheme="green">
        {t("serviceScreen.buttons.addOwners")}
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
          <ModalHeader>
            {t("serviceScreen.modalHeaders.addOwners", {
              service: currService.title
            })}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <UnsavedChangesAlert
              isOpen={alertOpen}
              setIsOpen={setAlertOpen}
              onClick={() => onclose}
            />
            <ServiceOwnerForm submitCallback={addOwners} />
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

export default AddServiceOwnersTriggerBtn;
