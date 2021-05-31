import { Button, Checkbox, Table, Tbody, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useState } from "react";
import { ActionIdDto, IActionIdDto } from "services/backend/nswagts";

import CopyActionListItem from "./CopyActionListItem";

type Props = {
  tableData: IActionIdDto[];
  submitCallback: (actionIds: number[]) => Promise<void>;
};

const CopyActionList: FC<Props> = ({ tableData, submitCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const { t } = useLocales();
  const [checkboxes, setCheckboxes] = useState(() =>
    tableData.map(action => ({
      id: action.id,
      checked: false
    }))
  );

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

    const approvers: number[] = [];
    checkboxes.forEach(modal => {
      if (modal.checked) {
        approvers.push(modal.id);
      }
    });
    await submitCallback(approvers);
    setIsLoading(false);
  }, [checkboxes]);

  return (
    <VStack width="full">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>{t("entityVariables.identifier")}</Th>
            <Th>{t("entityVariables.description")}</Th>
            <Th>
              <Checkbox
                isChecked={allChecked}
                onChange={() => checkAll()}
                size="lg"
                colorScheme="green"
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((action: ActionIdDto) => (
            <CopyActionListItem
              key={action.id}
              action={action}
              checked={checkboxes.find(e => e.id == action.id).checked}
              addAction={addAction}
            />
          ))}
        </Tbody>
      </Table>
      <Button
        onClick={() => onSubmit()}
        isLoading={isLoading}
        colorScheme="blue"
        mt="20"
        type="submit">
        {t("serviceScreen.actions.copyApprovers")}
      </Button>
    </VStack>
  );
};

export default CopyActionList;
