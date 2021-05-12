import { Center, Container, VStack } from "@chakra-ui/layout";
import GoogleSearchBar from "components/GoogleUserSearch/GoogleSearchBar";
import { ApplicationContext } from "contexts/ApplicationContext";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { AppTokenIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

const PendingApprovalPage: NextPage = () => {
  const [appTokens, setAppTokens] = useState<AppTokenIdDto[]>([]);
  const [currToken, setCurrToken] = useState<AppTokenIdDto>();

  const fetchAppTokens = useCallback(async () => {
    try {
      const client = await genApplicationClient();
      const data = await client.getAppTokenICanReview();

      if (data && data.length >= 0) setAppTokens(data);
      else logger.info("exampleClient.get no data");
    } catch (err) {
      logger.warn("exampleClient.get Error", err);
    }
  }, []);

  useEffect(() => {
    fetchAppTokens();
  }, [fetchAppTokens]);

  return (
    <ApplicationContext.Provider
      value={{
        services: [],
        applications: [],
        appTokens: appTokens,
        currToken: currToken,
        setCurrToken: setCurrToken,
        fetchApps: null,
        fetchServices: null,
        fetchAppTokens: fetchAppTokens
      }}>
      <Center>
        <Container pt="30px" pb="15px" w="xl" maxW="unset">
          <VStack width="full" align="left">
            <GoogleSearchBar submitUsers={() => null} />
          </VStack>
        </Container>
      </Center>
      {/* <PendingList /> */}
    </ApplicationContext.Provider>
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

export default PendingApprovalPage;
