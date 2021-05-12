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
import { ApplicationOwnerDto, IApplicationOwnerDto, IUser } from "services/backend/nswagts";

type Props = {
  submitCallback: (OwnerMetaDataForm: IApplicationOwnerDto[]) => Promise<void>;
  AppMetaData?: IApplicationOwnerDto[];
};

const AppOwnerForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appOwners, dispatchAppOwners] = useReducer(ListReducer<IApplicationOwnerDto>("email"), []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (AppMetaData) {
      dispatchAppOwners({
        type: ListReducerActionType.AddOrUpdate,
        data: AppMetaData
      });
    }
  }, [AppMetaData]);

  const updateLocalUserList = useCallback(
    (users: IUser[]) => {
      dispatchAppOwners({
        type: ListReducerActionType.Reset,
        data: users.map(o => new ApplicationOwnerDto({ email: o.primaryEmail }))
      });
    },
    [appOwners]
  );
  const addOwners = useCallback(async () => {
    setIsLoading(true);
    onClose();
    await submitCallback(appOwners);
    setIsLoading(false);
  }, [appOwners]);

  return (
    <Box width="full">
      <Flex mb="10px" justify="center" align="center">
        <Box> Add owners below by searching for the person and clicking their name</Box>
        <Spacer />
        <Button
          isDisabled={appOwners.length == 0}
          isLoading={isLoading}
          colorScheme="blue"
          onClick={onOpen}>
          Add owners
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
          <AlertDialogHeader>Confirm new owners</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to add these users to your application?
            <Box>
              {appOwners.map(owner => (
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
            <Button onClick={() => addOwners()} type="submit" colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
export default AppOwnerForm;
