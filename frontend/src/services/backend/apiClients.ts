import { api } from "./api";
import {
  ApplicationClient,
  AuthClient,
  ExampleChildClient,
  ServiceClient,
  UserClient
} from "./nswagts";

export const genExampleClient = (): Promise<ExampleChildClient> => api(ExampleChildClient);

export const genServiceClient = (): Promise<ServiceClient> => api(ServiceClient);

export const genAuthenticationClient = (): Promise<AuthClient> => api(AuthClient);

export const genApplicationClient = (): Promise<ApplicationClient> => api(ApplicationClient);

export const genGoogleUserClient = (): Promise<UserClient> => api(UserClient);
