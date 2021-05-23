import jwtDecode from "jwt-decode";

interface ParsedToken {
  exp: number;
}

export class TokenStorage {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  getToken(): string | undefined {
    const token = localStorage.getItem(this.key);
    if (token) {
      const expired = this.checkExpiration(token);
      if (expired) {
        localStorage.removeItem(this.key);
        return undefined;
      } else {
        return token;
      }
    } else {
      return undefined;
    }
  }

  setToken(token: string) {
    localStorage.setItem(this.key, token);
  }

  hasToken(): boolean {
    const token = localStorage.getItem(this.key);
    if (token) {
      const expired = this.checkExpiration(token);
      if (expired) {
        localStorage.removeItem(this.key);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private checkExpiration(token: string): boolean {
    const decodedToken: ParsedToken = jwtDecode(token);
    if (decodedToken.exp) {
      return Date.now() / 1000 >= decodedToken.exp;
    }
    return false;
  }
}

// import jwtDecode from "jwt-decode";

// const ACCESS_TOKEN_KEY = "access_token";
// const REFRESH_TOKEN_KEY = "refresh_token";

// interface ParsedToken {
//   exp: number;
// }

// type TSEventNames = "expire access" | "expire refresh";

// type TSEvent = ExpireEvent;

// interface ExpireEvent {}

// export class TokenStorage {
//   private _listeners: Record<TSEventNames, ((event: TSEvent) => void)[]> = {
//     "expire access": [],
//     "expire refresh": []
//   };

//   async getAccessToken(): Promise<string | undefined> {
//     const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
//     if (accessToken) {
//       const expired = this.checkExpiration(accessToken);
//       if (expired) {
//         return undefined;
//       } else {
//         return accessToken;
//       }
//     } else {
//       return undefined;
//     }
//   }

//   async getRefreshToken(): Promise<string | undefined> {
//     const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
//     if (refreshToken) {
//       const expired = this.checkExpiration(refreshToken);
//       if (expired) {
//         return undefined;
//       } else {
//         return refreshToken;
//       }
//     } else {
//       return undefined;
//     }
//   }

//   setTokens(accessToken: string | undefined, refreshToken: string | undefined) {
//     if (accessToken) {
//       localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

//     }

//     if (refreshToken) {
//       localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

//     }
//   }

//   clearTokens() {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//   }

//   private checkExpiration(token: string): boolean {
//     const decodedToken: ParsedToken = jwtDecode(token);
//     if (decodedToken.exp) {
//       return Date.now() / 1000 >= decodedToken.exp;
//     }
//     return false;
//   }

//   addEventListener(name: TSEventNames, listener: (event: TSEvent) => void) {
//     this._listeners[name].push(listener);
//   }

//   removeEventListener(name: TSEventNames, listener: (event: TSEvent) => void) {
//     const index = this._listeners[name].indexOf(listener);
//     if (index >= 0) {
//       this._listeners[name].splice(index, 1);
//     }
//   }

//   dispatchEvent(name: TSEventNames, event: TSEvent) {
//     for (let listener of this._listeners[name]) {
//       listener(event);
//     }
//   }
// }
