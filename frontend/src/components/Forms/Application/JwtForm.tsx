import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useClipboard,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import CollapsibleInfoBox from "components/Common/CollapsibleInfoBox";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { CreateAuthAppTokenCommand, IService2, TokenInput } from "services/backend/nswagts";

type Props = {
  aid: string;
  tokenIdentifier: string;
  submitCallback: () => void;
  services: IService2[];
};

const JwtForm: FC<Props> = ({ aid, submitCallback, services, tokenIdentifier }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [appSecret, setAppSecret] = useState("");
  const [JWT, setJWT] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(JWT);
  const { t } = useLocales();
  const toast = useToast();

  const CreateJWT = useCallback(async () => {
    const applicationClient = await genApplicationClient();
    try {
      const appResult = await applicationClient.createAuthAppToken(
        aid,
        new CreateAuthAppTokenCommand({
          tokenInput: new TokenInput({
            tokenIdentifier: tokenIdentifier,
            services: services
          })
        }),
        appSecret
      );
      setJWT(appResult.jwt);
      onOpen();
    } catch (error) {
      toast({
        description: `${t("toasts.xCreatedE", {
          x: "JWT"
        })} ${error}`,

        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  }, [appSecret, aid]);

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      await CreateJWT();
      setIsLoading(false);
    },
    [appSecret]
  );
  return (
    <Center>
      <Box width="full" p={6}>
        <form onSubmit={onSubmit}>
          <FormControl isRequired>
            <Box>
              <CollapsibleInfoBox text={t("applicationScreen.tokens.infoBoxes.GenerateJwtInfo")} />
            </Box>
            <FormLabel>App secret:</FormLabel>
            <Textarea
              type="text"
              value={appSecret}
              placeholder={t("applicationScreen.tokens.appSecret.appSecretPlaceholder")}
              onChange={event => setAppSecret(event.target.value)}
            />
          </FormControl>
          <Center>
            <Button isLoading={isLoading} colorScheme="blue" mt={6} type="submit">
              {t("applicationScreen.tokens.actions.generateJwt")}
            </Button>
          </Center>
        </form>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          submitCallback();
        }}
        scrollBehavior="inside"
        size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("applicationScreen.modalHeaders.hereIsYourAppSecret")} {aid}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Text>{JWT}</Text>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" onClick={onCopy} mr={2}>
              {hasCopied ? t("commonButtons.copied") : t("commonButtons.copy")}
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                submitCallback();
              }}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
export default JwtForm;
