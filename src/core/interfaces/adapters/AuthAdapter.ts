import AuthResponse from "@models/auth/AuthResponse";
import Credentials from "@models/auth/Credentials";
import RefreshToken from "@models/auth/RefreshToken";
import User from "@models/auth/User";

abstract class AuthAdapter {
  abstract register(user: User): Promise<User>;
  abstract login(credentials: Credentials): Promise<AuthResponse>;
  abstract updateToken(refreshToken: RefreshToken): Promise<AuthResponse>;
  abstract saveAuthorizationHeader(token: string): void;
  abstract clearAuthorization(): void;
  abstract logout(userId: string): Promise<void>;
  abstract findUserById(userID: string): Promise<User>;
}

export default AuthAdapter;
