import Credentials from "@models/auth/Credentials";
import AuthUseCase from "@interfaces/useCases/AuthUseCase";
import User from "@models/auth/User";
import CacheService from "@services/CacheService";
import dayjs from "dayjs";
import AuthResponse from "@models/auth/AuthResponse";

class AuthService extends AuthUseCase {
  async register(user: User): Promise<User> {
    const response = await this.adapter.register(user);
    const credentials = Credentials.fromJSON({
      email: response.email,
      password: response.password,
    });
    return this.login(credentials);
  }

  async login(credentials: Credentials): Promise<User> {
    const authResponse = await this.adapter.login(credentials);
    CacheService.saveAuthResponse(authResponse);
    this.configureAuthorization(authResponse);
    return this.findUserById(authResponse.refreshToken?.userId!);
  }

  async configureAuthorization(authResponse: AuthResponse): Promise<void> {
    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(authResponse.refreshToken?.expiresIn!)
    );

    if (refreshTokenExpired) {
      await this.updateToken(authResponse);
      const newAuthResponse = CacheService.getAuthResponse();
      this.adapter.saveAuthorizationHeader(newAuthResponse?.token!);
      return;
    }

    this.adapter.saveAuthorizationHeader(authResponse.token);
  }

  async updateToken(cachedUser: AuthResponse): Promise<boolean> {
    if (!cachedUser) return true;
    if (cachedUser?.refreshToken) {
      const newAuthResponse = await this.adapter.updateToken(
        cachedUser?.refreshToken
      );
      if (!newAuthResponse.refreshToken) {
        const appendRefreshToken = AuthResponse.fromJSON({
          token: newAuthResponse.token,
          refreshToken: cachedUser.refreshToken,
        });
        CacheService.saveAuthResponse(appendRefreshToken);
        return false;
      }
      CacheService.saveAuthResponse(newAuthResponse);
    }
    return false;
  }

  async logout(userId: string): Promise<void> {
    await this.adapter.logout(userId);
    CacheService.clearUser();
  }

  async findUserById(userID: string): Promise<User> {
    return this.adapter.findUserById(userID);
  }
}

export default AuthService;
