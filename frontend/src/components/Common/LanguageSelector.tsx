import {
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useColors } from "hooks/useColors";
import { useLocales } from "hooks/useLocales";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

const LanguageSelector: FC = () => {
  const { route, events, query } = useRouter();
  const { hoverBg } = useColors();

  const { localeNameMap, locale } = useLocales();

  const disclosure = useDisclosure();

  useEffect(() => {
    events.on("routeChangeStart", () => {
      disclosure.onClose();
    });
  }, []);

  return (
    <Popover {...disclosure}>
      <PopoverTrigger>
        <Image
          src={"/images/locales/" + locale + ".png"}
          alt="Locale Image"
          width={8}
          height={8}
          quality={90}
          objectFit="contain"
          borderRadius={10}
          _hover={{
            bg: hoverBg
          }}
          padding={1}
          cursor="pointer"
        />
      </PopoverTrigger>
      <PopoverContent w={"66%"} marginLeft={12}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody marginTop={4}>
          <VStack align="flex-end ">
            {localeNameMap &&
              Object.entries(localeNameMap)?.map(loc => (
                <Link
                  href={{
                    pathname: route,
                    query
                  }}
                  locale={loc[0]}
                  key={loc[0]}
                  passHref>
                  <HStack
                    cursor="pointer"
                    _hover={{
                      background: hoverBg
                    }}
                    padding={1}
                    spacing={1}
                    borderRadius={10}>
                    <Text>{loc[1]}</Text>
                    <Image
                      src={"/images/locales/" + loc[0] + ".png"}
                      alt=""
                      width={8}
                      height={8}
                      quality={90}
                      objectFit="contain"
                      borderRadius="full"
                    />
                  </HStack>
                </Link>
              ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default LanguageSelector;
