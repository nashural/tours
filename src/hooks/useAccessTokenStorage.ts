import { TokenStorage } from "../classes/TokenStorage";
import { accessTokenStorage } from "../contexts/accessTokenStorage";
import { useContext } from "react";

export const useAccessTokenStorage = (): TokenStorage => {
  return useContext(accessTokenStorage) as TokenStorage;
};
