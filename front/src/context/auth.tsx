import { apiLogin, registerUserLocalStorage } from "@/controllers/auth/auth";
import { getDecodedToken } from "@/controllers/auth/jwtHandler";
import {
  ApiErrorRespose,
  DecodedToken,
  LoginOKResponse,
  LoginParams,
} from "@/types/auth";
import { ApiError } from "next/dist/server/api-utils";
import { createContext, useContext, useState } from "react";
import { set } from "react-hook-form";
import { any } from "zod";

export interface AuthContextProps {
  user: DecodedToken | null;
  login: (params: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkError: () => Promise<void>;
  getPermissions: () => Promise<void>;
  wrongCredentials: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  wrongCredentials: false,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
  checkError: async () => {},
  getPermissions: async () => {},
});

// Create the AuthContext

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const login = async ({ username, password }: LoginParams) => {
    // call login api
    const response = await apiLogin({ username, password });
    if (response.status === 200) {
      setWrongCredentials(false);
      const token = await response.json();
      registerUserLocalStorage(token);
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        setUser(decodedToken);
      } else {
      }
    } else {
      setWrongCredentials(true);
    }
  };

  const logout = async () => {
    // call logout api
    // await logoutApi();
    // setUser(null);
  };

  const checkAuth = async () => {
    // call checkAuth api
    // const user = await checkAuthApi();
    // setUser(user);
  };

  const checkError = async () => {
    // call checkError api
    // const user = await checkErrorApi();
    // setUser(user);
  };

  const getPermissions = async () => {
    // call getPermissions api
    // const user = await getPermissionsApi();
    // setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        wrongCredentials,
        login,
        logout,
        checkAuth,
        checkError,
        getPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
