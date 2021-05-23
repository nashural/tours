import { FC } from "react";
import { apiClient as apiClientContext } from "../contexts/apiClient";
import { ApiClient } from "../api/ApiClient";

export const ApiClientProvider: FC<{
  apiClient: ApiClient;
}> = ({ apiClient, children }) => {
  return (
    <apiClientContext.Provider value={apiClient}>
      {children}
    </apiClientContext.Provider>
  );
};
