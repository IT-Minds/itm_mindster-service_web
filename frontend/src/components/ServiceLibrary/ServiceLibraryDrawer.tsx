import {
  Box,
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
  useToast
} from "@chakra-ui/react";
import SeeTokenStatusDrawer from "components/ApplicationScreen/Tokens/TokenStatus/SeeTokenStatusDrawer";
import CollapsibleInfoBox from "components/Common/CollapsibleInfoBox";
import ThreeStepShower from "components/Common/ThreeStepShower";
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { Dispatch, FC, SetStateAction, useCallback, useContext } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { TokenStates, UpdateAppTokenStateCommand } from "services/backend/nswagts";

import ServiceLibrary from "./ServiceLibrary";

type Props = {
  Open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ServiceLibraryDrawer: FC<Props> = ({ Open, setOpen }) => {
  const { currToken, fetchUpdatedToken } = useContext(AppViewContext);
  const { t } = useLocales();
  const toast = useToast();

  const requestReview = useCallback(async () => {
    const applicationClient = await genApplicationClient();
    try {
      await applicationClient.updateTokenState(
        currToken.id,
        new UpdateAppTokenStateCommand({
          newState: TokenStates.AwaitingReview
        })
      );
      toast({
        description: t("toasts.reviewRequested"),
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `${t("toasts.reviewRequestedE")} ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      fetchUpdatedToken(currToken.id);
    }
  }, [currToken]);

  const leaveLibraryDrawer = useCallback(async () => {
    setOpen(false);
  }, []);

  if (currToken) {
    return (
      <>
        <Drawer onClose={() => setOpen(false)} isOpen={Open} size="full">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>
                <Flex>
                  <Box>{t("applicationScreen.modalHeaders.serviceLibrary")}</Box>
                  <Spacer />
                  <CloseButton onClick={() => setOpen(false)} />
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <Center w="full" height="full">
                  <Container height="full" w="7xl" maxW="unset">
                    <Flex h="full" flexDirection="column">
                      <Center>
                        <Box mb="5px" maxW="2xl">
                          <CollapsibleInfoBox
                            text={t("applicationScreen.tokens.infoBoxes.BrowseTokenInfo")}
                          />
                        </Box>
                      </Center>
                      <Box h="full" overflowY="auto">
                        <ServiceLibrary />
                      </Box>
                      <Spacer />
                      <Center m="3">
                        <Box>
                          {currToken.appTokenActions.length > 0 && (
                            <SeeTokenStatusDrawer
                              submitOnOpen={() => {
                                return requestReview();
                              }}
                              buttonText={t("applicationScreen.tokens.actions.requestReview")}
                              buttonColor="green"
                              submitOnClose={leaveLibraryDrawer}
                            />
                          )}
                        </Box>
                      </Center>
                      <ThreeStepShower radius={50} stepCounter={2} />
                    </Flex>
                  </Container>
                </Center>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  } else return null;
};

export default ServiceLibraryDrawer;
