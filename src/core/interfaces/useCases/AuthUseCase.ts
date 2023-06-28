import Credentials from "@models/auth/Credentials";
import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import User from "@models/auth/User";
import AuthResponse from "@models/auth/AuthResponse";

abstract class AuthUseCase {
  constructor(protected readonly adapter: AuthAdapter) {}

  abstract register(user: User): Promise<User>;
  abstract login(credentials: Credentials): Promise<User>;
  abstract logout(userId: string): Promise<void>;
  abstract configureAuthorization(authResponse: AuthResponse): Promise<void>;
  abstract updateToken(cachedUser: AuthResponse): Promise<void>;
  abstract findUserById(userID: string): Promise<User>;
}

export default AuthUseCase;
