import { ApiClient } from "./ApiClient";
import { TokenStorage } from "../classes/TokenStorage";

export const createApiClient = (
  accessTokenStorage: TokenStorage,
  refreshTokenStorage: TokenStorage
): ApiClient => {
  return new ApiClient(accessTokenStorage, refreshTokenStorage);
};
