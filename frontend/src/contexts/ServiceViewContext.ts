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
  serviceOwners: IServiceOwnerIdDto[];
  approvers: IActionApproverIdDto[];
  currService: IServiceIdDto;
  currAction: IActionIdDto;
  pendingTokens: IAppTokenIdDto[];
  setCurrService: Dispatch<SetStateAction<IServiceIdDto>>;
  setNewCurrService: (serviceId: number) => Promise<void>;
  setCurrAction: Dispatch<SetStateAction<IActionIdDto>>;
  fetchServices: () => Promise<void>;
  fetchOwners: () => Promise<void>;
  fetchActionApprovers: () => Promise<void>;
  fetchPendingTokens: () => Promise<void>;
};

export const ServiceViewContext = createContext<ContextType>({
  services: [],
  serviceOwners: [],
  approvers: [],
  pendingTokens: [],
  currService: null,
  currAction: null,
  setCurrService: null,
  setNewCurrService: null,
  setCurrAction: null,
  fetchServices: null,
  fetchOwners: null,
  fetchActionApprovers: null,
  fetchPendingTokens: null
});
