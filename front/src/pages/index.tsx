import Image from "next/image";
import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/button-toggle";
import { useAuthentication } from "@/hooks/checkAuthentication";
import AgreementList from "@/components/agreement-list";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useAuthentication();
  return (
    <main>
      <AgreementList />
      {/*<div>hello</div>*/}
    </main>
  );
}
