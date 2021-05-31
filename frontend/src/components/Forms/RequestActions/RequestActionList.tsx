import {
  Box,
  Button,
  Checkbox,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
  VStack
} from "@chakra-ui/react";
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { ActionIdDto, CreateAppTokenActionsCommand, IServiceIdDto } from "services/backend/nswagts";

import RequestActionListItem from "./RequestActionListItem";

interface ActionTableProps {
  tableData: ActionIdDto[];
  existingActions: number[];
  service: IServiceIdDto;
  submitCallBack?: () => void;
}

const RequestActionList: FC<ActionTableProps> = ({
  tableData,
  submitCallBack,
  existingActions,
  service
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxes, setCheckboxes] = useState(() =>
    tableData.map(action => ({
      id: action.id,
      checked: false
    }))
  );
  const { currToken, fetchUpdatedToken } = useContext(AppViewContext);
  const toast = useToast();
  const { t } = useLocales();

  useEffect(() => {
    setCheckboxes(
      checkboxes.map(x => {
        if (existingActions.includes(x.id)) x.checked = !x.checked;
        return x;
      })
    );
    setAllChecked(checkboxes.every(e => e.checked == true));
  }, [tableData]);

  useEffect(() => {
    if (checkboxes) {
      setAllChecked(checkboxes.every(e => e.checked == true));
    }
  }, [checkboxes]);

  const checkAll = useCallback(() => {
    setCheckboxes(
      checkboxes.map(x => {
        x.checked = !allChecked;
        return x;
      })
    );
    setAllChecked(!allChecked);
  }, [allChecked, checkboxes]);

  const addAction = useCallback(
    (data: number) => {
      setCheckboxes(
        checkboxes.map(x => {
          if (x.id == data) x.checked = !x.checked;
          return x;
        })
      );
      setAllChecked(checkboxes.every(e => e.checked == true));
    },
    [checkboxes, allChecked]
  );

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    const actions: number[] = [];
    checkboxes.forEach(modal => {
      if (modal.checked) {
        actions.push(modal.id);
      }
    });
    const client = await genApplicationClient();
    try {
      await client.requestServiceActions(
        currToken.id,
        new CreateAppTokenActionsCommand({
          service: {
            serviceId: service.id,
            actionIds: actions
          }
        })
      );
      toast({
        description: t("toasts.accessRequested"),

        status: "success",
        duration: 5000,
        isClosable: true
      });
      fetchUpdatedToken(currToken.id);
      submitCallBack();
    } catch (error) {
      toast({
        description: `${t("toasts.accessRequestedE")} ${error}`,

        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    setIsLoading(false);
  }, [checkboxes, currToken]);

  return (
    <Box>
      {tableData.length != 0 ? (
        <VStack width="full">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={allChecked}
                    onChange={() => checkAll()}
                    size="lg"
                    colorScheme="green"
                  />
                </Th>
                <Th>{t("entityVariables.identifier")}</Th>
                <Th w={0.7}>{t("entityVariables.description")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((action: ActionIdDto) => (
                <RequestActionListItem
                  key={action.id}
                  action={action}
                  checked={checkboxes.find(e => e.id == action.id).checked}
                  addAction={addAction}></RequestActionListItem>
              ))}
            </Tbody>
          </Table>
          <Box w="full">
            <Button
              isLoading={isLoading}
              onClick={() => onSubmit()}
              colorScheme="blue"
              mt={6}
              type="submit">
              {t("applicationScreen.serviceLibrary.requestAccess")}
            </Button>
          </Box>
        </VStack>
      ) : (
        <Box w="full" justifyContent="center">
          {t("applicationScreen.serviceLibrary.noActions")}
        </Box>
      )}
    </Box>
  );
};

export default RequestActionList;
