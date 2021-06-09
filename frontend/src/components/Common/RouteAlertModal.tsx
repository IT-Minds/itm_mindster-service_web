import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";
import { UnsavedChangesContext } from "contexts/UnsavedChangesContext";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect } from "react";

const RouteAlertModal: FC = () => {
  const cancelRef = React.useRef();
  const router = useRouter();
  const { alertOpen, setAlertOpen, unsavedChanged, setUnsavedChanges, targetUrl } = useContext(
    UnsavedChangesContext
  );

  useEffect(() => {
    if (!unsavedChanged) {
      if (targetUrl) {
        if (targetUrl == "back") router.back();
        else router.push(targetUrl);
      }
    }
  }, [unsavedChanged]);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setAlertOpen(true)}
      isOpen={alertOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Confirm navigation</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          You have unsaved changes on this page, are you sure you want to leave the page?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => setAlertOpen(false)}>
            Stay on this page
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => {
              setUnsavedChanges(false);
              setAlertOpen(false);
            }}>
            Leave page
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default RouteAlertModal;
