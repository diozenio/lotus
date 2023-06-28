import { PropsWithChildren, useCallback, useState } from "react";
import { AuthCTX } from "./AuthCTX";
import User from "@models/auth/User";
import Credentials from "@models/auth/Credentials";
import AuthUseCase from "@interfaces/useCases/AuthUseCase";
import { ErrorHandler } from "ui/errors/ErrorHandler";
import { toast } from "react-toastify";
import CacheService from "@services/CacheService";

interface AuthProviderProps {
  service: AuthUseCase;
}

function AuthProvider({
  children,
  service,
}: PropsWithChildren<AuthProviderProps>) {
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
      const response = await service.login(credentials);
      setUser(response);
    } catch (error) {
      panic(error);
    }
  }, []);

  const signUp = useCallback(async (user: User) => {
    try {
      const response = await service.register(user);
      setUser(response);
    } catch (error) {
      panic(error);
    }
  }, []);

  const findUserById = useCallback(async (userId: string) => {
    try {
      const response = await service.findUserById(userId);
      setUser(response);
    } catch (error) {
      panic(error);
    }
  }, []);

  const cachedUser = CacheService.getAuthResponse();
  if (cachedUser && !user) {
    service
      .configureAuthorization(cachedUser)
      .then(() => {
        findUserById(cachedUser?.refreshToken?.userId!);
      })
      .catch((error: unknown) => {
        panic(error);
      });
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
