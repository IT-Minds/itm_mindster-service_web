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
import UnsavedChangesAlert from "components/Common/UnsavedChangesAlert";
import ReviewTokenForm from "components/Forms/ReviewAcces/ReviewTokenForm";
import { useLocales } from "hooks/useLocales";
import { useUnsavedAlert } from "hooks/useUnsavedAlert";
import React, { FC } from "react";
import { AppTokenIdDto } from "services/backend/nswagts";

type Props = {
  token: AppTokenIdDto;
};

const ReviewTokenModalTrigger: FC<Props> = ({ token }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocales();
  const { alertOpen, setAlertOpen, unsavedChanged } = useUnsavedAlert();

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        {t("serviceScreen.pendingTokens.reviewToken")}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (unsavedChanged) {
            setAlertOpen(true);
          } else onClose();
        }}
        scrollBehavior="inside"
        size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("serviceScreen.pendingTokens.reviewModal.header", {
              identifier: token.tokenIdentifier
            })}
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
            <ReviewTokenForm token={token} />
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

export default ReviewTokenModalTrigger;
