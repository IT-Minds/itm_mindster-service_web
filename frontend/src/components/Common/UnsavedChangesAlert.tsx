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
import React, { Dispatch, FC, useContext } from "react";
type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
  text?: string;
};
const UnsavedChangesAlert: FC<Props> = ({ isOpen, setIsOpen, onClick, text }) => {
  const cancelRef = React.useRef();
  const { setUnsavedChanges } = useContext(UnsavedChangesContext);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {
        alert("onClick");

        onClick();
        setIsOpen(false);
      }}
      isOpen={isOpen}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Confirm navigation</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {text ?? "You have unsaved changes , are you sure you want to leave?"}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="blue" ref={cancelRef} onClick={() => setIsOpen(false)}>
            Stay
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => {
              setUnsavedChanges(false);
              onClick();
              setIsOpen(false);
            }}>
            Leave
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UnsavedChangesAlert;
