import { Box, HStack, Td, Tr } from "@chakra-ui/react";
import { BsCheck } from "@react-icons/all-files/bs/BsCheck";
import { BsStar } from "@react-icons/all-files/bs/BsStar";
import { BsStarFill } from "@react-icons/all-files/bs/BsStarFill";
import { AppViewContext } from "contexts/AppViewContext";
import { useColors } from "hooks/useColors";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { ApplicationIdDto } from "services/backend/nswagts";

type Props = {
  application: ApplicationIdDto;
};
const AppTableItem: FC<Props> = ({ application }) => {
  const { hoverBg } = useColors();
  const { currApplication, setCurrApp } = useContext(AppViewContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  return (
    <Tr
      onClick={() => {
        setCurrApp(application);
        router.replace({
          pathname: "/ApplicationScreen",
          query: { id: application.id }
        });
      }}
      key={application.id}
      _hover={{
        bgColor: hoverBg
      }}
      cursor={"pointer"}>
      <Td>
        <HStack>
          <BsCheck
            visibility={currApplication && currApplication.id == application.id ? "" : "hidden"}
          />
          <Box onClick={() => setIsFavorite(!isFavorite)} cursor={"pointer"}>
            {isFavorite ? <BsStarFill color="yellow" /> : <BsStar />}
          </Box>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Box>{application.title}</Box>
        </HStack>
      </Td>
      <Td maxW="100px">{application.appIdentifier}</Td>
    </Tr>
  );
};
export default AppTableItem;
