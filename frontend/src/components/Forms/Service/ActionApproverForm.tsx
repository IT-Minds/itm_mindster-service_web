import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Spacer,
  Tag,
  useDisclosure
} from "@chakra-ui/react";
import GoogleSearchBar from "components/GoogleUserSearch/GoogleSearchBar";
import React, { FC, useCallback, useEffect, useReducer, useRef, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { ActionApproverDto, IActionApproverIdDto, IUser } from "services/backend/nswagts";

type Props = {
  submitCallback: (OwnerMetaDataForm: IActionApproverIdDto[]) => Promise<void>;
  AppMetaData?: IActionApproverIdDto[];
};

const ActionApproverForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [approvers, dispatchApprovers] = useReducer(ListReducer<IActionApproverIdDto>("email"), []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (AppMetaData) {
      dispatchApprovers({
        type: ListReducerActionType.AddOrUpdate,
        data: AppMetaData
      });
    }
  }, [AppMetaData]);

  const updateLocalUserList = useCallback(
    (users: IUser[]) => {
      dispatchApprovers({
        type: ListReducerActionType.Reset,
        data: users.map(o => new ActionApproverDto({ email: o.primaryEmail }))
      });
    },
    [approvers]
  );
  const addApprovers = useCallback(async () => {
    setIsLoading(true);
    onClose();
    await submitCallback(approvers);
    setIsLoading(false);
  }, [approvers]);

  return (
    <Box width="full">
      <Flex mb="10px" justify="center" align="center">
        <Box> Add approvers below by searching for the person and clicking their name</Box>
        <Spacer />
        <Button
          isDisabled={approvers.length == 0}
          isLoading={isLoading}
          colorScheme="blue"
          onClick={onOpen}>
          Add Approvers
        </Button>
      </Flex>
      <GoogleSearchBar submitUsers={updateLocalUserList} />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Confirm new Approvers</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to add these approvers to your action?
            <Box>
              {approvers.map(owner => (
                <Tag m="5px" key={owner.email}>
                  {owner.email}
                </Tag>
              ))}
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={() => addApprovers()} type="submit" colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
export default ActionApproverForm;
