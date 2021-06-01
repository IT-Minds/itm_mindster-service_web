import { ApplicationContext } from "contexts/ApplicationContext";
import { Locale } from "i18n/Locale";
import { GetStaticProps, NextPage } from "next";
import { I18nProps } from "next-rosetta";
import { useCallback, useEffect, useState } from "react";
import { genApplicationClient } from "services/backend/apiClients";
import { AppTokenIdDto } from "services/backend/nswagts";
import { logger } from "utils/logger";

import PendingList from "../../components/PendingApprovals/PendingList";

const PendingApprovalPage: NextPage = () => {
  const [appTokens, setAppTokens] = useState<AppTokenIdDto[]>([]);
  const [currToken, setCurrToken] = useState<AppTokenIdDto>();

  //GetAllAppTokens(true) only returns tokens that have the pending state in them
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
      <PendingList />
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
