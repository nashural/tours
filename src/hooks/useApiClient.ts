import { ApiClient } from "../api/ApiClient";
import { apiClient } from "../contexts/apiClient";
import { useContext } from "react";

export const useApiClient = (): ApiClient => {
  return useContext(apiClient) as ApiClient;
};
