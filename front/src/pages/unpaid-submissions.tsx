import { useAuthentication } from "@/hooks/checkAuthentication";
import { useEffect } from "react";
import { getUnpaidSubmissions } from "@/controllers/submissions/submissions";

export default function UnpaidSubmissions() {
  useEffect(() => {
    const getAgreements = async () => {
      const res = await getUnpaidSubmissions();
      console.log(res);
    };
    getAgreements();
  }, []);

  useAuthentication();
}
