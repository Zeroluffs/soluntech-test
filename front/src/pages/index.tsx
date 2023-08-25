import Image from "next/image";
import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/ButtonToggle";
import { useAuthentication } from "@/hooks/checkAuthentication";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useAuthentication();
  return (
    <main>
      {/*<div>hello</div>*/}
      {/*<ModeToggle />*/}
    </main>
  );
}
