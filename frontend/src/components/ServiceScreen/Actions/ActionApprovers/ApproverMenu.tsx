import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useToast,
  VStack
} from "@chakra-ui/react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useButtonSizes } from "hooks/useButtonSizes";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback, useContext, useState } from "react";
import { genServiceClient } from "services/backend/apiClients";
import {
  CreateActionApproverCommand,
  IActionApproverDto,
  IActionIdDto
} from "services/backend/nswagts";

import AddActionApproverTriggerBtn from "./AddActionApproverTriggerBtn";
import CopyApproverTriggerBtn from "./CopyApprovers/CopyApproversTriggerBtn";
import ViewActionApproversTriggerBtn from "./ViewActionApproversTriggerBtn";

type Props = {
  action: IActionIdDto;
};
const ApproverMenu: FC<Props> = ({ action }) => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useLocales();
  const { approvers, fetchActionApprovers, currAction, setCurrAction } = useContext(
    ServiceViewContext
  );
  const toast = useToast();
  const { defBtnSize } = useButtonSizes();
  const addApprovers = useCallback(async (actionId: number, form: IActionApproverDto[]) => {
    const client = await genServiceClient();
    try {
      await client.addActionApprovers(
        actionId,
        new CreateActionApproverCommand({
          actionApprovers: form
        })
      );
      toast({
        description: t("toasts.xAdded", { x: t("entityNames.plural.approvers") }),
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (error) {
      toast({
        description: `${t("toasts.xAddedE", {
          x: t("entityNames.plural.approvers")
        })} ${error}`,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      fetchActionApprovers();
    }
  }, []);

  if (approvers.length == 0) return null;
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          size={defBtnSize}
          colorScheme="blue"
          rightIcon={<BsChevronDown />}
          onClick={() => {
            setCurrAction(action);
            setOpen(!isOpen);
          }}>
          {t("entityVariables.actions")}
        </Button>
      </PopoverTrigger>
      <PopoverContent minWidth="200" padding="0" boxSize="min-content" margin="0">
        <PopoverArrow />
        <PopoverBody padding="0">
          {currAction != null && (
            <VStack minWidth="full" spacing="0">
              <ViewActionApproversTriggerBtn
                approvers={approvers.filter(e => e.actionId == currAction.id)}
              />
              <AddActionApproverTriggerBtn submitCallback={addApprovers} />
              <CopyApproverTriggerBtn
                approversToCopy={approvers.filter(e => e.actionId == currAction.id)}
                submitCallback={addApprovers}
              />
            </VStack>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default ApproverMenu;
