import { UnsavedChangesContext } from "contexts/UnsavedChangesContext";
import { useContext, useState } from "react";

// ignore due to implied typing is better suited for this kind of hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUnsavedAlert = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const { setUnsavedChanges, unsavedChanged } = useContext(UnsavedChangesContext);

  return {
    alertOpen,
    setAlertOpen,
    setUnsavedChanges,
    unsavedChanged
  };
};
