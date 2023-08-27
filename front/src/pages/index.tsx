import { Inter } from "next/font/google";
import { useAuthentication } from "@/hooks/checkAuthentication";
import AgreementList from "@/components/agreement-list";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useAuthentication();
  return (
    <main>
      <AgreementList />
    </main>
  );
}
