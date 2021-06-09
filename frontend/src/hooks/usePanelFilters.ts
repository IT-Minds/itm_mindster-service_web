import { useCallback, useEffect, useState } from "react";

export class LocaleStoragePaths {
  recent: string;
  starred: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePanelFilters = (storageType: string) => {
  const [recent, setRecent] = useState<number[]>([]);
  const [starred, setStarred] = useState<number[]>([]);
  const localStoragePaths: LocaleStoragePaths = {
    recent: "recent" + storageType,
    starred: "starred" + storageType
  };
  const amountOfRecentAllowed = 5;

  useEffect(() => {
    const localRecent = localStorage.getItem(localStoragePaths.recent);
    setRecent(localRecent ? JSON.parse(localRecent) : []);
    const localStarred = localStorage.getItem(localStoragePaths.starred);
    setStarred(localStarred ? JSON.parse(localStarred) : []);
  }, []);

  const pushRecent = useCallback(
    (id: number) => {
      if (!recent.find(o => o == id)) {
        if (recent.length >= amountOfRecentAllowed) recent.pop();
        recent.unshift(id);
        localStorage.setItem(localStoragePaths.recent, JSON.stringify(recent));
        setRecent(recent);
      }
    },
    [recent]
  );
  const pushStarred = useCallback(
    (id: number) => {
      const index = starred.indexOf(id);
      if (index > -1) starred.splice(index, 1);
      else starred.push(id);
      localStorage.setItem(localStoragePaths.starred, JSON.stringify(starred));
      setStarred(starred);
    },
    [starred]
  );

  return {
    starred,
    recent,
    pushRecent,
    pushStarred
  };
};
