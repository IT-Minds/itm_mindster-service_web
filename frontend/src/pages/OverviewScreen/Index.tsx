import { Button } from "@chakra-ui/button";
import { Box, Center, Container, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/layout";
import OverviewHeader from "components/OverviewScreen/OverviewHeader";
import OverviewTable from "components/OverviewScreen/OverviewTable";
import { OverviewScreenContext } from "contexts/OverviewScreenContext";
import { useLocales } from "hooks/useLocales";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useReducer } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import { IAppOverviewDto, IServiceOverviewDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const OverviewScreen: NextPage = () => {
  const [applications, dispatchApplications] = useReducer(ListReducer<IAppOverviewDto>("id"), []);
  const [services, dispatchServices] = useReducer(ListReducer<IServiceOverviewDto>("id"), []);
  const { t } = useLocales();

  const fetchApps = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllMyApplicationsOverview();

      if (data && data.length > 0)
        dispatchApplications({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("ApplicationClient.getAllApps got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getAllApps Error", err);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getMyServicesOverview();

      if (data && data.length > 0)
        dispatchServices({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("ServiceClient.GetAllServices got no data");
    } catch (err) {
      logger.warn("ServiceClient.GetAllServices Error", err);
    }
  }, []);

  useEffect(() => {
    fetchApps();
    fetchServices();
  }, [fetchApps, fetchServices]);

  return (
    <OverviewScreenContext.Provider
      value={{
        applications: applications,
        services: services,
        fetchApps: fetchApps,
        fetchServices: fetchServices
      }}>
      <Flex h="100vh" maxW="unset" direction="column">
        <OverviewHeader />
        <Center>
          <Container pt="20px" w="6xl" maxW="unset">
            <SimpleGrid
              w="full"
              align="left"
              columns={2}
              minChildWidth="300px"
              spacingX="40px"
              spacingY="20px">
              {applications.length != 0 ? (
                <Box>
                  <OverviewTable
                    tableData={applications}
                    tableHeading={t("entityNames.plural.applications")}
                  />
                </Box>
              ) : (
                <Flex direction="column">
                  <Heading mb="10" size="h3">
                    Applications:
                  </Heading>
                  <Text fontSize="lg">
                    You have no applications yet, go to Application Page to create one
                  </Text>
                  <Link href="/ApplicationScreen">
                    <Button mt="10px" w="max-content" colorScheme="blue">
                      Application Page
                    </Button>
                  </Link>
                </Flex>
              )}
              {services.length != 0 ? (
                <Box>
                  <OverviewTable
                    tableData={services}
                    tableHeading={t("entityNames.plural.services")}
                  />
                </Box>
              ) : (
                <Flex direction="column">
                  <Heading mb="10" size="h3">
                    Services:
                  </Heading>
                  <Text fontSize="lg">
                    You have no services yet, go to Service Page to create one
                  </Text>
                  <Link href="/ServiceScreen">
                    <Button mt="10px" w="max-content" colorScheme="blue">
                      Service Page
                    </Button>
                  </Link>
                </Flex>
              )}
            </SimpleGrid>
          </Container>
        </Center>
      </Flex>
    </OverviewScreenContext.Provider>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<Locale>> = async context => {
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../../i18n/${locale}`);
  // table = await runTimeTable(locale, table);

  return {
    props: { table }
  };
};

export default OverviewScreen;
