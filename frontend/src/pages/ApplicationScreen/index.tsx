import { Box, Flex } from "@chakra-ui/layout";
import AppHeader from "components/ApplicationScreen/AppHeader";
import ApplicationInfo from "components/ApplicationScreen/ApplicationInfo";
import { AppViewContext } from "contexts/AppViewContext";
import { usePanelFilters } from "hooks/usePanelFilters";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import {
  IApplicationIdDto,
  IApplicationOwnerIdDto,
  IAppTokenIdDto,
  IServiceIdDto
} from "services/backend/nswagts";
import { logger } from "utils/logger";

const IndexPage: NextPage = () => {
  const [applications, dispatchApplications] = useReducer(ListReducer<IApplicationIdDto>("id"), []);
  const [services, dispatchServices] = useReducer(ListReducer<IServiceIdDto>("id"), []);
  const [appTokens, dispatchAppTokens] = useReducer(ListReducer<IAppTokenIdDto>("id"), []);
  const [appOwners, dispatchAppOwners] = useReducer(ListReducer<IApplicationOwnerIdDto>("id"), []);
  const [currApplication, setCurrApp] = useState<IApplicationIdDto>();
  const [currToken, setCurrToken] = useState<IAppTokenIdDto>();
  const { starred, recent, pushStarred, pushRecent } = usePanelFilters(
    "Applications" // Sets the prefix of where to save the recent and starred items
  );

  const { query } = useRouter();

  const fetchApps = useCallback(async () => {
    try {
      const applicationClient = await genApplicationClient();
      const data = await applicationClient.getAllApplications();

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

  const setNewCurrApp = useCallback(
    async (appId: number) => {
      await fetchApps();
      const newApp = applications.find(e => e.id == appId);

      if (newApp) {
        setCurrApp(newApp);
      } else logger.info("could not find app ID");
    },
    [applications]
  );

  const fetchAppTokens = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getAppTokensByAppId(currApplication.id);

      if (data && data.length >= 0) {
        dispatchAppTokens({
          type: ListReducerActionType.Reset,
          data
        });
      } else logger.info("ApplicationClient.getAppTokensByAppId got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getAppTokensByAppId Error", err);
    }
  }, [currApplication]);

  const fetchUpdatedToken = useCallback(
    async (tokenId: number) => {
      try {
        const client = await genApplicationClient();
        const data = await client.getAppTokenById(tokenId);

        if (data) {
          setCurrToken(data);
          dispatchAppTokens({
            type: ListReducerActionType.AddOrUpdate,
            data
          });
        } else logger.info("ApplicationClient.getTokenById got no data");
      } catch (err) {
        logger.warn("ApplicationClient.getTokenById Error", err);
      }
    },
    [currToken]
  );

  const fetchAppOwners = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getApplicationOwnersByAppId(currApplication.id);

      if (data && data.length > 0)
        dispatchAppOwners({
          type: ListReducerActionType.Reset,
          data
        });
      else logger.info("ApplicationClient.getApplicationsOwnersByAppId got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getApplicationsOwnersByAppId Error", err);
    }
  }, [currApplication]);

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getAllServices();

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
    if (query.Id) {
      const appId: number = +query.Id;
      setNewCurrApp(appId);
    }
  }, [fetchApps, fetchServices]);

  useEffect(() => {
    if (currApplication) {
      fetchAppOwners();
      fetchAppTokens();
    }
  }, [fetchAppOwners, fetchAppTokens, currApplication]);

  return (
    <AppViewContext.Provider
      value={{
        applications: applications,
        services: services,
        appTokens: appTokens,
        appOwners: appOwners,
        currApplication: currApplication,
        currToken: currToken,
        setCurrApp: setCurrApp,
        setNewCurrApp: setNewCurrApp,
        setCurrToken: setCurrToken,
        fetchUpdatedToken: fetchUpdatedToken,
        fetchApps: fetchApps,
        fetchAppTokens: fetchAppTokens,
        fetchServices: fetchServices,
        fetchAppOwners: fetchAppOwners,
        recentApps: recent,
        starredApps: starred,
        pushRecent: pushRecent,
        pushStarred: pushStarred
      }}>
      <Flex h="100vh" w="full" direction="column">
        <Box>
          <AppHeader />
        </Box>
        <Box maxH="full" w="full" overflowY="auto">
          <ApplicationInfo />
        </Box>
      </Flex>
    </AppViewContext.Provider>
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

export default IndexPage;
