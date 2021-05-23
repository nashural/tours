import { TokenStorage } from "../classes/TokenStorage";
import { refreshTokenStorage } from "../contexts/refreshTokenStorage";
import { useContext } from "react";

export const useRefreshTokenStorage = (): TokenStorage => {
  return useContext(refreshTokenStorage) as TokenStorage;
};
