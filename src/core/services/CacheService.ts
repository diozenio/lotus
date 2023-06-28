import CacheUseCase from "@interfaces/useCases/CacheUseCase";
import AuthResponse from "@models/auth/AuthResponse";

class CacheService extends CacheUseCase {
  static saveAuthResponse(authResponse: AuthResponse): void {
    localStorage.setItem("session", JSON.stringify(authResponse));
  }

  static getAuthResponse(): AuthResponse | undefined {
    const authResponse = localStorage.getItem("session");
    if (authResponse) {
      return AuthResponse.fromJSON(JSON.parse(authResponse));
    }
    return undefined;
  }

  static clearUser(): void {
    localStorage.removeItem("session");
  }
}

export default CacheService;
