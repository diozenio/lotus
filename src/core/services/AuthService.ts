import Credentials from "@models/auth/Credentials";
import AuthUseCase from "@interfaces/useCases/AuthUseCase";
import User from "@models/auth/User";
import CacheService from "@services/CacheService";
import AuthResponse from "@models/auth/AuthResponse";
import { verifyRefreshTokenExpiration } from "@utils/verifyRefreshTokeExpiration";

class AuthService extends AuthUseCase {
  async register(user: User): Promise<User> {
    const response = await this.adapter.register(user);
    return this.login(
      Credentials.fromJSON({
        email: response.email,
        password: response.password,
      })
    );
  }

  async login(credentials: Credentials): Promise<User> {
    const authResponse = await this.adapter.login(credentials);
    this.configureAuthorization(authResponse);
    CacheService.saveAuthResponse(authResponse);
    return this.findUserById(authResponse.refreshToken?.userId!);
  }

  configureAuthorization(authResponse: AuthResponse): Promise<void> {
    const refreshTokenExpired = verifyRefreshTokenExpiration(
      authResponse.refreshToken?.expiresIn!
    );

    if (refreshTokenExpired) {
      return Promise.resolve(this.updateToken(authResponse));
    }

    return Promise.resolve(
      this.adapter.saveAuthorizationHeader(authResponse.token)
    );
  }

  async updateToken(cachedUser: AuthResponse): Promise<void> {
    const newAuthResponse = await this.adapter.updateToken(
      cachedUser?.refreshToken!
    );
    if (!newAuthResponse.refreshToken) {
      const appendRefreshToken = AuthResponse.fromJSON({
        token: newAuthResponse.token,
        refreshToken: cachedUser.refreshToken,
      });
      CacheService.saveAuthResponse(appendRefreshToken);
      this.configureAuthorization(appendRefreshToken);
      return;
    }
    CacheService.saveAuthResponse(newAuthResponse);
    this.configureAuthorization(newAuthResponse);
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
