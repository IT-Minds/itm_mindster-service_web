import { createContext, Dispatch, SetStateAction } from "react";
import {
  IActionApproverIdDto,
  IActionIdDto,
  IAppTokenIdDto,
  IServiceIdDto,
  IServiceOwnerIdDto
} from "services/backend/nswagts";

type ContextType = {
  services: IServiceIdDto[];
  appTokens: IAppTokenIdDto[];
  serviceOwners: IServiceOwnerIdDto[];
  approvers: IActionApproverIdDto[];
  currService: IServiceIdDto;
  currAction: IActionIdDto;
  setCurrService: Dispatch<SetStateAction<IServiceIdDto>>;
  setCurrAction: Dispatch<SetStateAction<IActionIdDto>>;
  fetchUpdatedService: () => Promise<void>;
  fetchServices: () => Promise<void>;
  fetchOwners: () => Promise<void>;
  fetchAppTokens: () => Promise<void>;
  fetchActionApprovers: () => Promise<void>;
};

export const ServiceViewContext = createContext<ContextType>({
  services: [],
  appTokens: [],
  serviceOwners: [],
  approvers: [],
  currService: null,
  currAction: null,
  setCurrService: null,
  setCurrAction: null,
  fetchUpdatedService: null,
  fetchServices: null,
  fetchOwners: null,
  fetchAppTokens: null,
  fetchActionApprovers: null
});
