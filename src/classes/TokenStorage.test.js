import { TokenStorage } from "./TokenStorage";
import jwtEncode from "jwt-encode";

describe("TokenStorage", () => {
  it("should return non-expired token", () => {
    const tokenStorage = new TokenStorage("token");
    const token = jwtEncode(
      {
        exp: Math.round(Date.now() / 1000) + 1000
      },
      "secret"
    );

    tokenStorage.setToken(token);

    expect(tokenStorage.getToken()).toBe(token);
  });

  it("should not return expired token", () => {
    const tokenStorage = new TokenStorage("token");
    const token = jwtEncode(
      {
        exp: Math.round(Date.now() / 1000) - 1000
      },
      "secret"
    );

    tokenStorage.setToken(token);

    expect(tokenStorage.getToken()).toBe(undefined);
  });
});
