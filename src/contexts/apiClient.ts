import { ApiClient } from '../api/ApiClient'
import { createContext } from "react";

export const apiClient = createContext<ApiClient | null>(null);
