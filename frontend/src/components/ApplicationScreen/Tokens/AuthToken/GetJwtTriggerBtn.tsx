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
import JwtForm from "components/Forms/Application/JwtForm";
import { AppViewContext } from "contexts/AppViewContext";
import { useButtonSizes } from "hooks/useButtonSizes";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext, useEffect, useState } from "react";
import { IService2, Service2 } from "services/backend/nswagts";
type Props = {
  submitOnOpen: () => Promise<void>;
  buttonColor?: string;
};

const GetJwtTriggerBtn: FC<Props> = ({ submitOnOpen, buttonColor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, currToken, fetchUpdatedToken } = useContext(AppViewContext);
  const [jwtServices, setJwtServices] = useState<IService2[]>([]);
  const { defBtnSize } = useButtonSizes();
  const { t } = useLocales();

  useEffect(() => {
    if (currToken != null) {
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
                return b.action.actionIdentifier;
              })
          })
        );
      });
      console.log(input);
      setJwtServices(input);
    }
  }, [currToken]);

  if (currApplication == null) return null;
  return (
    <>
      <Button
        size={defBtnSize}
        colorScheme={buttonColor != null ? buttonColor : "blue"}
        w="full"
        onClick={async () => {
          await submitOnOpen();
          onOpen();
        }}>
        {t("applicationScreen.tokens.actions.generateJwt")}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {t("applicationScreen.modalHeaders.getJwt")}</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {currToken != null && (
              <JwtForm
                aid={currApplication.appIdentifier}
                tokenIdentifier={currToken.tokenIdentifier}
                submitCallback={() => {
                  onClose();
                  fetchUpdatedToken(currToken.id);
                }}
                services={jwtServices}
              />
            )}
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetJwtTriggerBtn;
