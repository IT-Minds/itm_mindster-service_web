import { Box, HStack, Td, Tr } from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useColors } from "hooks/useColors";
import { useRouter } from "next/router";
import React, { FC, useCallback, useContext, useState } from "react";
import { ServiceIdDto } from "services/backend/nswagts";

type Props = {
  service: ServiceIdDto;
};
const ServiceTableItem: FC<Props> = ({ service }) => {
  const { hoverBg } = useColors();
  const { currService, setCurrService, starredServices, pushRecent, pushStarred } = useContext(
    ServiceViewContext
  );
  const [isFavorite, setIsFavorite] = useState(
    starredServices.find(o => o == service.id) ? true : false
  );
  const router = useRouter();

  const onFavoriteClick = useCallback(
    event => {
      pushStarred(service.id); // If it already exists in the starred array it is removed instead.
      setIsFavorite(!isFavorite);
      event.stopPropagation();
    },
    [isFavorite]
  );

  return (
    <Tr
      onClick={() => {
        setCurrService(service);
        pushRecent(service.id);
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
          <Box onClick={event => onFavoriteClick(event)} zIndex={150} cursor={"pointer"}>
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
