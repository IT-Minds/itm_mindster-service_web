import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useProtectChanges = () => {
  const [unsavedChanged, setUnsavedChanges] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string>("");
  const router = useRouter();

  const confirmationMessage = "Changes you made may not be saved. las";
  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    (e || window.event).returnValue = confirmationMessage;
    console.log(e);
    console.log(window.event);
    return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
  };
  const beforeRouteHandler = (url: string) => {
    if (router.pathname !== url) {
      console.log(router.pathname);
      console.log(url);
      setTargetUrl(url);
      setAlertOpen(true);
      // to inform NProgress or something ...
      router.events.emit("routeChangeError");
      // tslint:disable-next-line: no-string-throw
      throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
    }
  };

  useEffect(() => {
    console.log("UnsavedChanges: " + unsavedChanged);
    if (unsavedChanged) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", beforeRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [unsavedChanged, setUnsavedChanges]);

  return { unsavedChanged, setUnsavedChanges, alertOpen, setAlertOpen, targetUrl, setTargetUrl };
};
