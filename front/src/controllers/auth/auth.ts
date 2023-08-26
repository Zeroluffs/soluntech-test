import { LoginOKResponse, LoginParams } from "@/types/auth";
import { BASE_URL } from "../consts";

export async function apiLogin(
  params: LoginParams,
): Promise<LoginOKResponse | any> {
  try {
    return await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
  } catch (error) {
    return error;
  }
}

export function registerUserLocalStorage(data: string) {
  localStorage.setItem("token", JSON.stringify(data));
}
