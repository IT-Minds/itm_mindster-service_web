import { Td, Tr } from "@chakra-ui/react";
import React, { FC } from "react";
import { IActionIdDto } from "services/backend/nswagts";

import ViewActionApproversTriggerBtn from "./ActionApprovers/ViewActionApproversTriggerBtn";

type Props = {
  action: IActionIdDto;
};
const ActionTableItem: FC<Props> = ({ action }) => {
  return (
    <Tr>
      <Td>{action.id}</Td>
      <Td>{action.title}</Td>
      <Td>
        <ViewActionApproversTriggerBtn currAction={action} />
      </Td>
    </Tr>
  );
};
export default ActionTableItem;
