import { TokenStorage } from '../classes/TokenStorage'
import { createContext } from "react";

export const refreshTokenStorage = createContext<TokenStorage | null>(null);
