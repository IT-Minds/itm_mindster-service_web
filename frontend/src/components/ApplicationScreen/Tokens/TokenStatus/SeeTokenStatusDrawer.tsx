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
import { useButtonSizes } from "hooks/useButtonSizes";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext, useEffect, useState } from "react";
import { ServiceStates } from "services/backend/nswagts";

import CollapsibleInfoBox from "../../../Common/CollapsibleInfoBox";
import GetJwtTriggerBtn from "../AuthToken/GetJwtTriggerBtn";
import TokenStatusList from "./TokenStatusList";

type Props = {
  submitOnClose: () => Promise<void>;
  submitOnOpen: () => Promise<void>;
  buttonText?: string;
  buttonColor?: string;
};
const SeeTokenStatusDrawer: FC<Props> = ({
  submitOnClose: submitCallback,
  submitOnOpen,
  buttonText,
  buttonColor
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currToken, currApplication } = useContext(AppViewContext);
  const [isAllApproved, setAllApproved] = useState(false);
  const { defBtnSize } = useButtonSizes();
  const { t } = useLocales();

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
        size={defBtnSize}
        w="full"
        onClick={async () => {
          await submitOnOpen();
          onOpen();
        }}
        colorScheme={buttonColor != null ? buttonColor : "blue"}>
        {buttonText != null ? buttonText : "See Status"}
      </Button>

      <Drawer
        onClose={() => {
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
                    {t("applicationScreen.modalHeaders.tokenStatus")} {currToken.tokenIdentifier}
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
                    <CollapsibleInfoBox
                      text={t("applicationScreen.tokens.infoBoxes.SeeTokenStatusInfo")}
                    />
                    <TokenStatusList />
                    <Center hidden={!isAllApproved} m="5">
                      <Box>
                        <GetJwtTriggerBtn buttonColor="green" submitOnOpen={() => null} />
                      </Box>
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
