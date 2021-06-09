import { useProtectChanges } from "hooks/useProtectChanges";
import { createContext } from "react";

type ContextType = ReturnType<typeof useProtectChanges>;

export const UnsavedChangesContext = createContext<ContextType>({
  unsavedChanged: false,
  setUnsavedChanges: () => null,
  alertOpen: false,
  setAlertOpen: () => null,
  targetUrl: null,
  setTargetUrl: () => null
});
