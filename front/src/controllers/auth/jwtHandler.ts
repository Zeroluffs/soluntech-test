import { DecodedToken } from "@/types/auth";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { BASE_URL } from "@/controllers/consts";
const JWT_SECRET = "secret";

export const getDecodedToken = (): DecodedToken | null => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  if (token) {
    try {
      const decoded = jwt_decode(token) as DecodedToken;
      return decoded as DecodedToken;
    } catch (error) {
      return null;
    }
  }

  return null;
};

export const verifyToken = async (): Promise<boolean> => {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  console.log("token to", token);
  if (token) {
    try {
      const response = await fetch(`${BASE_URL}/token/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      const res = await response.json();

      console.log("res auth", res);
      localStorage.setItem("token", JSON.stringify(res.newToken));
      return res.isValid;
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  }

  return false;
};
