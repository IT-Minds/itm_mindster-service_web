import { Box, HStack, Td, Tr } from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useColors } from "hooks/useColors";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};
const ServiceTableItem: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();
  const { currService, setCurrService } = useContext(ServiceViewContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  return (
    <Tr
      onClick={() => {
        setCurrService(service);
        router.replace({
          pathname: "/ServiceScreen",
          query: { id: service.id }
        });
      }}
      key={service.id}
      _hover={{
        bgColor: hoverBg
      }}
      cursor={"pointer"}>
      <Td>
        <HStack>
          <BsCheck visibility={currService && currService.id == service.id ? "" : "hidden"} />
          <Box onClick={() => setIsFavorite(!isFavorite)} cursor={"pointer"}>
            {isFavorite ? <BsStarFill color="yellow" /> : <BsStar />}
          </Box>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Box>{service.title}</Box>
        </HStack>
      </Td>
      <Td maxW="100px">{service.serviceIdentifier}</Td>
    </Tr>
  );
};
export default ServiceTableItem;
