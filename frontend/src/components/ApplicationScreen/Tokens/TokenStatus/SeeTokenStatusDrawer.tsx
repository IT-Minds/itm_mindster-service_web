import {
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import React, { FC, useContext, useEffect, useState } from "react";
import { ServiceStates } from "services/backend/nswagts";

import GetJwtTriggerBtn from "../AuthToken/GetJwtTriggerBtn";
import TokenStatusList from "./TokenStatusList";

type Props = {
  submitOnClose: () => Promise<void>;
  submitOnOpen: () => Promise<void>;
  buttonText?: string;
};
const SeeTokenStatusDrawer: FC<Props> = ({
  submitOnClose: submitCallback,
  submitOnOpen,
  buttonText
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currToken, currApplication } = useContext(AppViewContext);
  const [isAllApproved, setAllApproved] = useState(false);

  /**
   * Checks if all actions of a token are approved. If true the button to
   * get a JWT is visible
   */
  useEffect(() => {
    let approved = true;
    if (currToken) {
      currToken.appTokenActions.forEach(element => {
        console.log(element);
        if (element.state == ServiceStates.Rejected || element.state == ServiceStates.Pending) {
          approved = false;
        }
      });
      console.log(approved);
      setAllApproved(approved);
    }
  }, [currToken]);

  if (currApplication == null) return null;
  return (
    <>
      <Button
        onClick={async () => {
          await submitOnOpen();
          onOpen();
        }}
        colorScheme="blue">
        {buttonText != null ? buttonText : "See Status"}
      </Button>

      <Drawer
        onClose={() => {
          onClose();
          submitCallback();
        }}
        isOpen={isOpen}
        size="full">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <Flex>
                {currToken != null && (
                  <Box>
                    Status of {currToken.id} {currToken.description}
                  </Box>
                )}
                <Spacer />
                <CloseButton
                  onClick={() => {
                    onClose();
                    submitCallback();
                  }}
                />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Center h="full">
                <Container h="full" w="5xl" maxW="unset">
                  <Flex direction="column" height="full" width="full" align="left">
                    <TokenStatusList />
                    <Center hidden={!isAllApproved} m="5">
                      <GetJwtTriggerBtn submitOnOpen={() => null} />
                    </Center>
                    <Spacer />
                    <ThreeStepShower radius={50} stepCounter={3} />
                  </Flex>
                </Container>
              </Center>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
export default SeeTokenStatusDrawer;
