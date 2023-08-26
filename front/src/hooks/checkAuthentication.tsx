import { useRouter } from "next/router";
import { useEffect } from "react";
import { verifyToken } from "@/controllers/auth/jwtHandler";

export function useAuthentication() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    let res;

    async function checkToken() {
      res = await verifyToken();
      if (!token || !res) {
        router.push("/login");
      }
    }
    checkToken();
  }, []);
}
