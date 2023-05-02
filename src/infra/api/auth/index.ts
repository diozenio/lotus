import DTO from "@typing/http/DTO";
import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import AuthResponse from "@models/auth/AuthResponse";
import Credentials from "@models/auth/Credentials";
import { BackendClient } from "@api/client/BackendClient";
import User from "@models/auth/User";
import RefreshToken from "@models/auth/RefreshToken";

class AuthAPI extends AuthAdapter {
  async register(user: User): Promise<User> {
    const response = await BackendClient.post<DTO>(
      "/auth/users",
      user.toJSON()
    );
    return User.fromJSON(response.data);
  }

  async login(dto: Credentials): Promise<AuthResponse> {
    const response = await BackendClient.post<DTO>("/auth/login", dto.toJSON());
    return AuthResponse.fromJSON(response.data);
  }

  async updateToken(refreshToken: RefreshToken): Promise<AuthResponse> {
    const response = await BackendClient.post<DTO>("/auth/refresh", {
      refresh_token: refreshToken.id,
    });
    return AuthResponse.fromJSON(response.data);
  }

  override saveAuthorizationHeader(token: string): void {
    BackendClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  override clearAuthorization(): void {
    delete BackendClient.defaults.headers.common["Authorization"];
  }

  async logout(userId: string): Promise<void> {
    await BackendClient.post<DTO>("/auth/logout", userId);
    this.clearAuthorization();
  }

  async findUserById(userId: string): Promise<User> {
    const response = await BackendClient.get<DTO>(`/users/${userId}}`);
    return User.fromJSON(response.data);
  }
}

export default AuthAPI;
