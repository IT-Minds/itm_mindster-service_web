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
import { AppViewContext } from "contexts/AppViewContext";
import { useLocales } from "hooks/useLocales";
import React, { FC, useContext } from "react";

import AppTable from "./AppTable";
import CreateApplicationTriggerBtn from "./CreateApplicationTriggerBtn";

const SelectAppTriggerBtn: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currApplication, applications, starredApps, recentApps } = useContext(AppViewContext);
  const { t } = useLocales();

  return (
    <>
      <Button
        maxW={["100px", "250px", "400px", "full"]}
        width="max-content"
        colorScheme="gray"
        rightIcon={<BsChevronDown />}
        onClick={onOpen}>
        <Text isTruncated>
          {currApplication?.title ?? t("applicationScreen.modalHeaders.selectApp")}
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="5xl">
        <ModalOverlay />
        <ModalContent>
          <Flex align="center" justify="center">
            <ModalHeader minWidth="max-content">
              {t("applicationScreen.modalHeaders.selectApp")}
            </ModalHeader>
            <Spacer />
            <Box mr="20">
              <CreateApplicationTriggerBtn />
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
                  <AppTable
                    applications={applications.filter(o =>
                      recentApps.find(x => x == o.id)
                    )}></AppTable>
                </TabPanel>
                <TabPanel>
                  <AppTable
                    applications={applications.filter(o =>
                      starredApps.find(x => x == o.id)
                    )}></AppTable>
                </TabPanel>
                <TabPanel>
                  <AppTable applications={applications} />
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

export default SelectAppTriggerBtn;
