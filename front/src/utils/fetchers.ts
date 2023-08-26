import useSWR from "swr";
import { getUserAgreements } from "@/controllers/agreement/agreement";
import { getUnpaidSubmissions } from "@/controllers/submissions/submissions";

export function useAgreements() {
  const { data, error, isLoading } = useSWR(
    "/api/agreements",
    getUserAgreements,
  );

  return {
    data,
    isLoading,
    error,
  };
}

export function useUnpaidSubmissions() {
  const { data, error, isLoading } = useSWR(
    "/api/unpaidSubmissions",
    getUnpaidSubmissions,
  );
  return {
    data,
    isLoading,
    error,
  };
}
