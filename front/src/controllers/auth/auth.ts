import { LoginOKResponse, LoginParams } from "@/types/auth";
import { BASE_URL } from "../consts";

export async function apiLogin(
  params: LoginParams,
): Promise<LoginOKResponse | any> {
  try {
    // console.log(response);
    // const res = await response.json();
    // console.log(res);
    // if (!response.ok) {
    //   return response.json() as Promise<ApiErrorRespose>;
    // }
    // return response.json() as Promise<LoginOKResponse>;
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
