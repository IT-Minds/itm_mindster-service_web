import { Box, FormControl, FormLabel, HStack, Input, Select } from "@chakra-ui/react";
import { useLocales } from "hooks/useLocales";
import React, { FC, useCallback } from "react";
import { AppTokenActionUpdateDto, ServiceStates } from "services/backend/nswagts";

type Props = {
  index: number;
  localFormData: AppTokenActionUpdateDto;
  submitCallback: (index: number, action: AppTokenActionUpdateDto) => void;
};

const ReviewTokenFormItem: FC<Props> = ({ index, localFormData, submitCallback }) => {
  const { t } = useLocales();
  const handleStateChange = useCallback(
    (value: number) => {
      localFormData.state = value;
      submitCallback(index, localFormData);
    },
    [localFormData]
  );
  const handleTextChange = useCallback(
    (value: string) => {
      localFormData.rejectionReason = value;
      submitCallback(index, localFormData);
    },
    [localFormData]
  );

  return (
    <HStack spacing="5" p="2">
      <Box width="150px">
        <FormControl isRequired>
          <FormLabel>{t("serviceScreen.pendingTokens.reviewModal.response")}</FormLabel>
          <Select
            defaultValue={localFormData.state}
            placeholder={t("serviceScreen.pendingTokens.reviewModal.responses.pending")}
            onChange={event => handleStateChange(parseInt(event.target.value))}>
            <option value={ServiceStates.Approved}>
              {t("serviceScreen.pendingTokens.reviewModal.responses.approved")}
            </option>
            <option value={ServiceStates.Rejected}>
              {t("serviceScreen.pendingTokens.reviewModal.responses.rejected")}
            </option>
          </Select>
        </FormControl>
      </Box>
      <Box w="full">
        <FormControl
          isRequired={localFormData.state == ServiceStates.Rejected}
          isReadOnly={localFormData.state != ServiceStates.Rejected}>
          <FormLabel>{t("serviceScreen.pendingTokens.reviewModal.rejectionReason")}: </FormLabel>
          <Input
            type="text"
            value={localFormData.rejectionReason}
            onChange={event => handleTextChange(event.target.value)}></Input>
        </FormControl>
      </Box>
    </HStack>
  );
};
export default ReviewTokenFormItem;
