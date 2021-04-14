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
import AuthTokenForm from "components/Forms/Application/AuthTokenForm";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { IService2, Service2 } from "services/backend/nswagts";

const GetAuthTokenTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, currToken } = useContext(AppViewContext);
  const [jwtServices, setJwtServices] = useState<IService2[]>([]);

  useEffect(() => {
    let services = currToken.appTokenActions.map(action => {
      return action.action.serviceId;
    });
    const set = new Set(services);
    services = Array.from(set);

    const input: IService2[] = [];
    services.forEach(element => {
      input.push(
        new Service2({
          aud: element.toString(),
          access: currToken.appTokenActions
            .filter(a => a.action.serviceId == element)
            .map(b => {
              return b.actionId.toString();
            })
        })
      );
    });
    console.log(input);
    setJwtServices(input);
  }, [currToken]);

  if (currApplication == null) return null;
  return (
    <>
      <Button borderWidth="1px" borderColor="black" bgColor="green" onClick={onOpen}>
        Get JWT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Get the jwt for your approved token</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <AuthTokenForm
              aid={currApplication.title}
              submitCallback={() => {
                onClose();
              }}
              services={jwtServices}
            />
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetAuthTokenTriggerBtn;