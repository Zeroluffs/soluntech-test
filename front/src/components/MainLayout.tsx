import { NavBar } from "./NavBar";
import { Toaster } from "@/components/ui/toaster";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-7xl">
      <NavBar />
      {children}
      <Toaster />
    </div>
  );
}
