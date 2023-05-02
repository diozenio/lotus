import { interceptRequest } from "@utils/tests";
import AuthAPI from ".";
import AuthResponse from "@models/auth/AuthResponse";
import Credentials from "@models/auth/Credentials";
import User from "@models/auth/User";

const authAPI = new AuthAPI();

describe("AuthAPI.login", () => {
  const successfulLoginMock = AuthResponse.fromJSON({
    token: "token",
    refreshToken: {
      id: "refreshTokenID",
      expiresIn: 123134,
      userId: "userID",
    },
  });

  const credentialsMock = Credentials.fromJSON({
    email: "email@email.com",
    password: "password123",
  });

  it("should return an AuthResponse after successfully logging in", async () => {
    interceptRequest({ method: "post", body: successfulLoginMock.toJSON() });

    const loginAuthResponse = await authAPI.login(credentialsMock);

    expect(loginAuthResponse).not.toBeUndefined();
    expect(loginAuthResponse).toBeInstanceOf(AuthResponse);
    expect(loginAuthResponse.token).not.toBeUndefined();
    expect(loginAuthResponse.refreshToken).not.toBeUndefined();
    expect(loginAuthResponse.refreshToken?.expiresIn).not.toBeUndefined();
    expect(loginAuthResponse.refreshToken?.id).not.toBeUndefined();
    expect(loginAuthResponse.refreshToken?.userId).not.toBeUndefined();
  });

  it("should throw an error when trying to login", () => {
    interceptRequest({ method: "post", error: new Error() });

    const loginAuthResponse = authAPI.login(credentialsMock);

    expect(loginAuthResponse).rejects.toThrow();
  });
});

describe("AuthAPI.register", () => {
  const userMock = User.fromForm({
    name: "name",
    email: "email",
    password: "password",
  });

  const successfulRegisterMock = User.fromJSON(userMock.toJSON());

  it("should return an User after registered", async () => {
    interceptRequest({ method: "post", body: successfulRegisterMock.toJSON() });

    const registerResponse = await authAPI.register(userMock);

    expect(registerResponse).not.toBeUndefined();
    expect(registerResponse).toBeInstanceOf(User);
    expect(registerResponse.id).not.toBeUndefined();
    expect(registerResponse.id).toEqual(userMock.id);
    expect(registerResponse.name).not.toBeUndefined();
    expect(registerResponse.name).toEqual(userMock.name);
    expect(registerResponse.email).not.toBeUndefined();
    expect(registerResponse.email).toEqual(userMock.email);
    expect(registerResponse.password).not.toBeUndefined();
    expect(registerResponse.password).toEqual(userMock.password);
  });

  it("should throw an error when trying to register", () => {
    interceptRequest({ method: "post", error: new Error() });

    const registerResponse = authAPI.register(userMock);

    expect(registerResponse).rejects.toThrow();
  });
});

describe("AuthAPI.refreshAuth", () => {
  const refreshTokenMock = AuthResponse.fromJSON({
    token: "token",
    refreshToken: {
      id: "refreshTokenId",
      expiressIn: 1231441,
      userId: "userId",
    },
  });

  const { refreshToken } = refreshTokenMock;

  it("should return a full refresh token after refreshing", async () => {
    interceptRequest({ method: "post", body: refreshTokenMock.toJSON() });

    const refreshAuthResponse = await authAPI.updateToken(refreshToken!);

    expect(refreshAuthResponse).not.toBeUndefined();
    expect(refreshAuthResponse.refreshToken).not.toBeUndefined();
    expect(refreshAuthResponse.refreshToken?.id).not.toBeUndefined();
    expect(refreshAuthResponse.refreshToken?.expiresIn).not.toBeUndefined();
    expect(refreshAuthResponse.refreshToken?.userId).not.toBeUndefined();
  });

  it("should return a new auth token", async () => {
    interceptRequest({ method: "post", body: { token: "token" } });

    const refreshAuthResponse = await authAPI.updateToken(refreshToken!);

    expect(refreshAuthResponse).not.toBeUndefined();
    expect(refreshAuthResponse.refreshToken).toBeUndefined();
  });

  it("should throw an error when trying to register", () => {
    interceptRequest({ method: "post", error: new Error() });

    const refreshAuthResponse = authAPI.updateToken(refreshToken!);

    expect(refreshAuthResponse).rejects.toThrow();
  });
});

export {};
