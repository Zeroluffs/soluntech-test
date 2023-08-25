import { DecodedToken } from "@/types/auth";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
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
