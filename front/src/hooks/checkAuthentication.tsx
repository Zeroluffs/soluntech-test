import { Router, useRouter } from "next/router";
import { useEffect } from "react";

export function useAuthentication() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
}
