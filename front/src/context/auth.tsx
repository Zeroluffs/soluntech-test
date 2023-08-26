import { apiLogin, registerUserLocalStorage } from "@/controllers/auth/auth";
import { getDecodedToken } from "@/controllers/auth/jwtHandler";
import {
  ApiErrorRespose,
  DecodedToken,
  LoginOKResponse,
  LoginParams,
} from "@/types/auth";
import { ApiError } from "next/dist/server/api-utils";
import { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { any } from "zod";
import { useRouter } from "next/router";

export interface AuthContextProps {
  user: DecodedToken | null;
  balance: number;
  setBalance: (value: number) => void;
  login: (params: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkError: () => Promise<void>;
  getPermissions: () => Promise<void>;
  wrongCredentials: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  balance: 0,
  setBalance: () => {},
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
  const [balance, setBalance] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        setUser(decodedToken);
        setBalance(decodedToken.balance);
      }
    }
  }, []);

  const login = async ({ username, password }: LoginParams) => {
    // call login api

    const response = await apiLogin({ username, password });
    if (response.status === 200) {
      setWrongCredentials(false);
      const token = await response.json();
      registerUserLocalStorage(token);
      console.log("register");
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        await router.push("/");
        setBalance(decodedToken.balance);
        setUser(decodedToken);
      }
    } else {
      setWrongCredentials(true);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setBalance(0);
    await router.push("/login");
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
        balance,
        setBalance,
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
