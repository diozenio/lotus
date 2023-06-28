import { PropsWithChildren, useCallback, useState } from "react";
import { AuthCTX } from "./AuthCTX";
import User from "@models/auth/User";
import Credentials from "@models/auth/Credentials";
import AuthService from "@services/AuthService";
import AuthAPI from "@api/auth";
import CacheService from "@services/CacheService";

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>();

  const logout = useCallback(async () => {
    try {
      await service.logout(user?.id!);
      setUser(null);
    } catch (error) {
      toast.error("Não foi possível realizar a operação.");
    }
  }, []);

  const panic = useCallback((error: unknown) => {
    ErrorHandler.handleError(error, logout);
  }, []);

  const signIn = useCallback(async (credentials: Credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response);
    } catch (error) {
      panic(error);
    }
  }, []);

  const signUp = useCallback(async (user: User) => {
    try {
      const response = await authService.register(user);
      setUser(response);
    } catch (error) {
      panic(error);
    }
  }, []);

  const findUserById = useCallback(async (userId: string) => {
    try {
      const response = await authService.findUserById(userId);
      setUser(response);
    } catch (error) {
      panic(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout(user?.id!);
      setUser(null);
    } catch (error) {
      panic(error);
    }
  }, []);

  const getCachedUser = useCallback(async () => {
    try {
      if (cachedUser) {
        await authService.configureAuthorization(cachedUser);
        const response = await authService.findUserById(
          cachedUser.refreshToken?.id!
        );
        setUser(response);
      }
    } catch (error) {
      panic(error);
    }
  }, []);

  const useErrorHandler = useCallback(
    async (error: unknown): Promise<[string, boolean]> => {
      if (error instanceof Error) {
        switch (error.message) {
          case "Invalid Token":
            const shouldLogout = await authService.updateToken(cachedUser!);
            if (shouldLogout)
              return ["Sua sessão expirou, logue novamente!", shouldLogout];
            cachedUser = CacheService.getAuthResponse();
            getCachedUser();
            return ["", shouldLogout];

          case "User already exists":
            return [
              "E-mail já cadastrado. Tente fazer login ou use outro e-mail.",
              false,
            ];
          case "Unauthorized":
            return ["Sua sessão expirou, logue novamente!", true];
          default:
            return [error.message, true];
        }
      }
      return ["Unexpected error", true];
    },
    []
  );

  const panic = useCallback(async (error: unknown): Promise<boolean> => {
    const [message, shouldLogout] = await useErrorHandler(error);
    if (shouldLogout) {
      logout();
    }
    if (import.meta.env.DEV && message) {
      console.error("ERROR:", message);
    }
    return shouldLogout;
  }, []);

  if (!user && cachedUser) {
    getCachedUser();
  }

  return (
    <AuthCTX.Provider
      value={{ findUserById, logout, signIn, signUp, user, panic }}
    >
      {children}
    </AuthCTX.Provider>
  );
}

export default AuthProvider;
