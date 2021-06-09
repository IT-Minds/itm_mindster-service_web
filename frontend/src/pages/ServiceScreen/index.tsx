import { Box, Flex } from "@chakra-ui/layout";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ServiceHeader from "components/ServiceScreen/ServiceHeader";
import ServiceInfo from "components/ServiceScreen/ServiceInfo";
import { ServiceViewContext } from "contexts/ServiceViewContext";
import { SignalRContext } from "contexts/SignalRContext";
import { usePanelFilters } from "hooks/usePanelFilters";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useReducer, useState } from "react";
import ListReducer, { ListReducerActionType } from "react-list-reducer";
import { genApplicationClient, genServiceClient } from "services/backend/apiClients";
import {
  IActionApproverIdDto,
  IActionIdDto,
  IAppTokenIdDto,
  IServiceIdDto,
  IServiceOwnerIdDto
} from "services/backend/nswagts";
import { logger } from "utils/logger";

const ServiceScreen: NextPage = () => {
  const [services, dispatchServices] = useReducer(ListReducer<IServiceIdDto>("id"), []);
  const [pendingTokens, dispatchPendingTokens] = useReducer(ListReducer<IAppTokenIdDto>("id"), []);
  const [approvers, dispatchApprovers] = useReducer(ListReducer<IActionApproverIdDto>("id"), []);
  const [serviceOwners, dispatchServiceOwners] = useReducer(
    ListReducer<IServiceOwnerIdDto>("id"),
    []
  );
  const [currService, setCurrService] = useState<IServiceIdDto>();
  const [currAction, setCurrAction] = useState<IActionIdDto>();
  const { query } = useRouter();
  const { starred, recent, pushStarred, pushRecent } = usePanelFilters(
    "Services" // Sets the prefix of where to save the recent and starred items
  );

  const fetchPendingTokens = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getAppTokenICanReview();

      if (data && data.length >= 0) {
        dispatchPendingTokens({
          type: ListReducerActionType.Reset,
          data
        });
      } else logger.info("ApplicationClient.getAppTokensICanReview got no data");
    } catch (err) {
      logger.warn("ApplicationClient.getAppToken Error", err);
    }
  }, []);

  const fetchServices = useCallback(async () => {
    try {
      const serviceClient = await genServiceClient();
      const data = await serviceClient.getMyServices();

      if (data && data.length > 0)
        dispatchServices({
          type: ListReducerActionType.AddOrUpdate,
          data
        });
      else logger.info("ServiceClient.getMyServices got no data");
    } catch (err) {
      logger.warn("ServiceClient.getMyServices Error", err);
    }
  }, []);

  const setNewCurrService = useCallback(
    async (serviceId: number) => {
      await fetchServices();
      const newService = services.find(e => e.id == serviceId);

      if (newService) {
        setCurrService(newService);
      } else logger.info("could find service ID");
    },
    [services]
  );

  const fetchServiceOwners = useCallback(async () => {
    try {
      const client = await genServiceClient();
      const data = await client.getServiceOwnersByServiceId(currService.id);

      if (data && data.length > 0)
        dispatchServiceOwners({
          type: ListReducerActionType.Reset,
          data
        });
      else logger.info("ServiceClient.getServiceOwnersByServiceId no data");
    } catch (err) {
      logger.warn("ServiceClient.getServiceOwnersByServiceId Error", err);
    }
  }, [currService]);

  const fetchActionApprovers = useCallback(async () => {
    try {
      const client = await genServiceClient();
      const data = await client.getActionApproversByServiceId(currService.id);

      if (data && data.length > 0) {
        dispatchApprovers({
          type: ListReducerActionType.Reset,
          data
        });
      } else logger.info("ServiceClient.GetActionApproversByServiceId got no data");
    } catch (err) {
      logger.warn("ServiceClient.GetActionApproversByServiceId Error", err);
    }
  }, [currService]);

  useEffect(() => {
    fetchServices();
    fetchPendingTokens();
    if (query.Id) {
      const serviceId: number = +query.Id;
      setNewCurrService(serviceId);
    }
  }, [fetchServices]);

  useEffect(() => {
    if (currService) {
      console.log(currService);
      fetchServiceOwners();
      if (currService.actions.length > 0) {
        fetchActionApprovers();
      }
    }
  }, [fetchServiceOwners, fetchActionApprovers, currService]);

  return (
    <ServiceViewContext.Provider
      value={{
        services: services,
        pendingTokens: pendingTokens,
        serviceOwners: serviceOwners,
        currService: currService,
        approvers: approvers,
        currAction: currAction,
        setCurrAction: setCurrAction,
        setCurrService: setCurrService,
        setNewCurrService: setNewCurrService,
        fetchPendingTokens: fetchPendingTokens,
        fetchOwners: fetchServiceOwners,
        fetchServices: fetchServices,
        fetchActionApprovers: fetchActionApprovers,
        recentServices: recent,
        starredServices: starred,
        pushRecent: pushRecent,
        pushStarred: pushStarred
      }}>
      <SignalRContext.Provider
        value={{
          connection: new HubConnectionBuilder()
            .withUrl(`https://localhost:5001/pendingTokensHub`)
            .configureLogging(LogLevel.Information)
            .build()
        }}>
        <Flex h="100vh" w="full" direction="column">
          <Box h="70px" zIndex={1} w="full" position="fixed">
            <ServiceHeader />
          </Box>
          <Box maxH="full" w="full">
            <ServiceInfo />
          </Box>
        </Flex>
      </SignalRContext.Provider>
    </ServiceViewContext.Provider>
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
export default ServiceScreen;
