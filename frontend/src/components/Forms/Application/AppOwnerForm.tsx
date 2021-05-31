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
import { useLocales } from "hooks/useLocales";
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
  const { t } = useLocales();

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
        <Box>{t("googleSearch.addOwnerText")}</Box>
        <Spacer />
        <Button
          isDisabled={appOwners.length == 0}
          isLoading={isLoading}
          colorScheme="blue"
          onClick={onOpen}>
          {t("googleSearch.addOwner")}
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
          <AlertDialogHeader>{t("alerts.appOwners.header")}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {t("alerts.appOwners.text")}
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
              {t("commonButtons.no")}
            </Button>
            <Button onClick={() => addOwners()} type="submit" colorScheme="red" ml={3}>
              {t("commonButtons.yes")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};
export default AppOwnerForm;
