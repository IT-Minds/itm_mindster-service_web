import { createContext, Dispatch, SetStateAction } from "react";
import {
  IApplicationIdDto,
  IApplicationOwnerIdDto,
  IAppTokenIdDto,
  IServiceIdDto
} from "services/backend/nswagts";

type ContextType = {
  applications: IApplicationIdDto[];
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  appOwners: IApplicationOwnerIdDto[];
  currApplication: IApplicationIdDto;
  currToken: IAppTokenIdDto;
  setCurrApp: Dispatch<SetStateAction<IApplicationIdDto>>;
  setNewCurrApp: (appId: number) => Promise<void>;
  setCurrToken: Dispatch<SetStateAction<IAppTokenIdDto>>;
  fetchUpdatedToken: (tokenId: number) => Promise<void>;
  fetchAppOwners: () => Promise<void>;
  fetchApps: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
  recentApps: number[];
  starredApps: number[];
  pushRecent: (id: number) => void;
  pushStarred: (id: number) => void;
};

export const AppViewContext = createContext<ContextType>({
  applications: [],
  services: [],
  appTokens: [],
  appOwners: [],
  currApplication: null,
  currToken: null,
  setCurrApp: null,
  setNewCurrApp: null,
  setCurrToken: null,
  fetchUpdatedToken: null,
  fetchApps: null,
  fetchServices: null,
  fetchAppOwners: null,
  fetchAppTokens: null,
  recentApps: [],
  starredApps: [],
  pushStarred: null,
  pushRecent: null
});
