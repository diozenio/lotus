import Credentials from "@models/auth/Credentials";
import User from "@models/auth/User";
import React, { createContext } from "react";

interface Props {
  user: User | undefined | null;
  signUp: (user: User) => Promise<void>;
  signIn: (credentials: Credentials) => Promise<void>;
  findUserById: (userID: string) => Promise<void>;
  logout: () => Promise<void>;
  panic(err: unknown): void;
  isAuthenticating: boolean;
}

export const AuthCTX = createContext<Props>({} as Props);

export const useAuth = () => {
  const context = React.useContext(AuthCTX);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
