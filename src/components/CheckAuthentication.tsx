import { FC, ReactElement } from "react";
import { useAccessTokenStorage } from "../hooks/useAccessTokenStorage";

export const CheckAuthentication: FC<{
  children: (isAuthenticated: boolean) => ReactElement;
}> = ({ children }) => {
  const accessTokenStorage = useAccessTokenStorage();
  const isAuthenticated = accessTokenStorage.hasToken();

  return children(isAuthenticated);
};
