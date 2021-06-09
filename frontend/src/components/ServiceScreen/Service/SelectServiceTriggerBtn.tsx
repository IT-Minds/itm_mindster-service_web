import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext } from "react";

import CreateServiceTriggerBtn from "./CreateServiceTriggerBtn";
import ServiceTable from "./ServiceTable";

const SelectServiceTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currService, recentServices, starredServices, services } = useContext(ServiceViewContext);
  const { t } = useLocales();

  const selectString = t("serviceScreen.modalHeaders.selectService");

  return (
    <>
      <Button
        maxW={["100px", "250px", "400px", "full"]}
        width="max-content"
        rightIcon={<BsChevronDown />}
        colorScheme="gray"
        onClick={onOpen}>
        <Text isTruncated>{currService?.title ?? selectString}</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center">
            <ModalHeader minWidth="max-content">{selectString}</ModalHeader>
            <Spacer />
            <Box mr="20">
              <CreateServiceTriggerBtn />
            </Box>
            <ModalCloseButton />
          </Flex>
          <Divider />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>{t("SelectorTabs.recent")}</Tab>
                <Tab>
                  <Box>{t("SelectorTabs.starred")}</Box>
                </Tab>
                <Tab>{t("SelectorTabs.all")}</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <ServiceTable
                    services={services.filter(o => recentServices.find(x => x == o.id))}
                  />
                </TabPanel>
                <TabPanel>
                  <ServiceTable
                    services={services.filter(o => starredServices.find(x => x == o.id))}
                  />
                </TabPanel>
                <TabPanel>
                  <ServiceTable services={services} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {t("commonButtons.close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectServiceTriggerBtn;
