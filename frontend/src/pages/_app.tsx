import "../styles.global.css";
import "isomorphic-unfetch";

import { Center, ChakraProvider, CircularProgress } from "@chakra-ui/react";
import RouteAlertModal from "components/Common/RouteAlertModal";
import { UnsavedChangesContext } from "contexts/UnsavedChangesContext";
import { AuthStage, useAuth } from "hooks/useAuth";
import { useProtectChanges } from "hooks/useProtectChanges";
import { AppPropsType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import { I18nProvider } from "next-rosetta";
import { ReactElement, useEffect } from "react";
import EnvSettings from "types/EnvSettings";
import isomorphicEnvSettings, { setEnvSettings } from "utils/envSettings";
import { logger } from "utils/logger";

import theme from "../theme/theme";

type Props = {
  envSettings: EnvSettings;
};

const MyApp = ({ Component, pageProps, __N_SSG, router }: AppPropsType & Props): ReactElement => {
  // usePWA(); //! OPT IN

  const auth = useAuth(); //! OPT IN
  const protectChanges = useProtectChanges();

  useEffect(() => {
    if (!__N_SSG) {
      logger.info("Environment should be readable");

      const envSettings = isomorphicEnvSettings();
      if (envSettings) setEnvSettings(envSettings);
      if (process.browser) {
        fetch("/api/getEnv")
          .then(res => {
            if (res.ok) return res.json();
            throw res.statusText;
          })
          .then(
            envSettings => setEnvSettings(envSettings),
            e => {
              logger.debug("env error", e);
            }
          );
      }
    }
  }, []);

  useEffect(() => {
    if (auth.authStage == AuthStage.UNAUTHENTICATED && router.query.demo != "1") {
      auth.login();
    }
  }, [auth.authStage, router]);

  return (
    <main>
      <Head>
        <title>Mindster Service</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#2196f3" />
        <meta name="description" content="Mindster Service" />
        <meta name="robots" content="noindex" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/icons/icon-192x192.png"></link>
      </Head>
      <noscript>
        <h1>JavaScript must be enabled!</h1>
      </noscript>
      {auth.authStage !== AuthStage.AUTHENTICATED && router.query.demo != "1" ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <I18nProvider table={pageProps.table}>
          <ChakraProvider theme={theme}>
            <UnsavedChangesContext.Provider value={protectChanges}>
              <RouteAlertModal />
              {/* <AuthContext.Provider value={auth}> */}
              {/* <SignalRContext.Provider value={{ connection }}> */}
              <Component {...pageProps} />
              {/* </SignalRContext.Provider> */}
              {/* </AuthContext.Provider> */}
            </UnsavedChangesContext.Provider>
          </ChakraProvider>
        </I18nProvider>
      )}
    </main>
  );
};

export default MyApp;
