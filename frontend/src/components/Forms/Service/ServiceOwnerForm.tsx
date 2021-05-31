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
import { IServiceOwnerDto, IUser, ServiceOwnerDto } from "services/backend/nswagts";

type Props = {
  submitCallback: (OwnerMetaDataForm: IServiceOwnerDto[]) => Promise<void>;
  AppMetaData?: IServiceOwnerDto[];
};

const ServiceOwnerForm: FC<Props> = ({ submitCallback, AppMetaData }) => {
  const { t } = useLocales();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceOwners, dispatchServiceOwners] = useReducer(
    ListReducer<IServiceOwnerDto>("email"),
    []
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (AppMetaData) {
      dispatchServiceOwners({
        type: ListReducerActionType.AddOrUpdate,
        data: AppMetaData
      });
    }
  }, [AppMetaData]);

  const updateLocalUserList = useCallback(
    (users: IUser[]) => {
      dispatchServiceOwners({
        type: ListReducerActionType.Reset,
        data: users.map(o => new ServiceOwnerDto({ email: o.primaryEmail }))
      });
    },
    [serviceOwners]
  );
  const addOwners = useCallback(async () => {
    setIsLoading(true);
    onClose();
    await submitCallback(serviceOwners);
    setIsLoading(false);
  }, [serviceOwners]);

  return (
    <Box width="full">
      <Flex mb="10px" align="center">
        <Box>{t("googleSearch.addOwnerText")}</Box>
        <Spacer />
        <Button
          isDisabled={serviceOwners.length == 0}
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
          <AlertDialogHeader>{t("alerts.serviceOwners.header")}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {t("alerts.serviceOwners.text")}
            <Box>
              {serviceOwners.map(owner => (
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
export default ServiceOwnerForm;
