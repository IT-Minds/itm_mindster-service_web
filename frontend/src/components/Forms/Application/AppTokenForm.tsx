import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Wrap
} from "@chakra-ui/react";
import { UnsavedChangesContext } from "contexts/UnsavedChangesContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { AppTokenCreateDto, IAppTokenCreateDto } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

type Props = {
  submitCallback: (AppMetaDataForm: IAppTokenCreateDto) => Promise<void>;
};

const AppTokenForm: FC<Props> = ({ submitCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [title, setTitle] = useState("");
  const { t } = useLocales();
  const { setUnsavedChanges } = useContext(UnsavedChangesContext);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setIsLoading(true);
      setUnsavedChanges(false);
      await submitCallback(
        new AppTokenCreateDto({ tokenIdentifier: identifier, description: description })
      );
      setIsLoading(false);
    },
    [description, identifier]
  );

  useEffect(() => {
    if (title) {
      const timeOutId = setTimeout(() => setIdentifier(convertToIdentifier(title)), 700);
      return () => clearTimeout(timeOutId);
    } else setIdentifier("");
  }, [title]);

  useEffect(() => {
    if (title || description) {
      setUnsavedChanges(true);
    } else setUnsavedChanges(false);
  }, [title, description]);

  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full">
            <Heading fontSize="sm">{t("entityVariables.identifier")}: </Heading>
            {identifier}
            <form onSubmit={() => handleSubmit(event)}>
              <FormControl mt="6" isRequired>
                <FormLabel>{t("entityVariables.name")}:</FormLabel>
                <Input
                  type="text"
                  placeholder={`${t("entityNames.single.token")} ${t(
                    "entityVariables.identifier"
                  )}`}
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />
              </FormControl>
              <FormControl mt="6" isRequired>
                <FormLabel>{t("entityVariables.description")}:</FormLabel>
                <Textarea
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </FormControl>
              <Center>
                <Button isLoading={isLoading} colorScheme="blue" type="submit" mt={6}>
                  {t("commonButtons.submit")}
                </Button>
              </Center>
            </form>
          </Box>
        </Flex>
      </Wrap>
    </Center>
  );
};
export default AppTokenForm;
