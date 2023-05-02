import AuthResponse from "@models/auth/AuthResponse";

abstract class CacheUseCase {
  static saveAuthResponse(authResponse: AuthResponse): void {
    throw new Error('you must implement "saveAuthResponse"');
  }

  static getAuthResponse(): AuthResponse | undefined {
    throw new Error('you must implement "getAuthResponse"');
  }

  static clearUser(): void {
    throw new Error('you must implement "clearUser"');
  }
}

export default CacheUseCase;
