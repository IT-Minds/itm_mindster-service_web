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
import { useLocales } from "hooks/useLocales";
import { useUnsavedAlert } from "hooks/useUnsavedAlert";
import React, { FC, useCallback, useEffect, useState } from "react";
import { ActionDto, IActionDto } from "services/backend/nswagts";
import { convertToIdentifier } from "utils/convertTitleToIdentifier";

type Props = {
  submitCallback: (AppMetaDataForm: IActionDto) => Promise<void>;
};

const ActionForm: FC<Props> = ({ submitCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [identifier, setIdentifier] = useState("");
  const { t } = useLocales();
  const { setUnsavedChanges } = useUnsavedAlert();

  const onSubmit = useCallback(
    async event => {
      setIsLoading(true);
      event.preventDefault();
      setUnsavedChanges(false);
      await submitCallback(
        new ActionDto({
          title: title,
          description: description,
          adminNote: adminNote,
          actionIdentifier: title
        })
      );
      setIsLoading(false);
    },
    [title, description, adminNote, identifier]
  );

  useEffect(() => {
    if (title) {
      const timeOutId = setTimeout(() => setIdentifier(convertToIdentifier(title)), 700);
      return () => clearTimeout(timeOutId);
    } else setIdentifier("");
  }, [title]);

  useEffect(() => {
    if (title || description || adminNote) setUnsavedChanges(true);
    else setUnsavedChanges(false);
  }, [title, description, adminNote]);

  return (
    <Center>
      <Wrap width="full" justify="center">
        <Flex width="full" align="center" justifyContent="center">
          <Box width="full" p={6}>
            <Heading size="h3">{t("entityVariables.identifier")}: </Heading>
            {identifier}
            <form onSubmit={onSubmit}>
              <FormControl mt="6" isRequired>
                <FormLabel>{t("entityVariables.title")}:</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={event => {
                    setTitle(event.target.value);
                  }}></Input>
              </FormControl>
              <FormControl mt="6">
                <FormLabel>{t("entityVariables.description")}:</FormLabel>
                <Textarea
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </FormControl>
              <FormControl mt="6">
                <FormLabel>{t("entityVariables.adminNote")}:</FormLabel>
                <Input value={adminNote} onChange={event => setAdminNote(event.target.value)} />
              </FormControl>
              <Center>
                <Button isLoading={isLoading} colorScheme="blue" mt={6} type="submit">
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
export default ActionForm;
