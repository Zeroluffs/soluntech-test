import Image from "next/image";
import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/ButtonToggle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div>hello</div>
      <ModeToggle />
    </main>
  );
}
