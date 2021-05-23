import { FC } from "react";
import { accessTokenStorage as accessTokenStorageContext } from "../contexts/accessTokenStorage";
import { refreshTokenStorage as refreshTokenStorageContext } from "../contexts/refreshTokenStorage";
import { TokenStorage } from "../classes/TokenStorage";

export const TokenStoragesProvider: FC<{
  accessTokenStorage: TokenStorage;
  refreshTokenStorage: TokenStorage;
}> = ({ accessTokenStorage, refreshTokenStorage, children }) => {
  return (
    <accessTokenStorageContext.Provider value={accessTokenStorage}>
      <refreshTokenStorageContext.Provider value={refreshTokenStorage}>
        {children}
      </refreshTokenStorageContext.Provider>
    </accessTokenStorageContext.Provider>
  );
};
