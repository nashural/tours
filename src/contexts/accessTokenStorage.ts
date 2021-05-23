import { TokenStorage } from '../classes/TokenStorage'
import { createContext } from "react";

export const accessTokenStorage = createContext<TokenStorage | null>(null);
