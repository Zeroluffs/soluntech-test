import { NavBar } from "./NavBar";
import { Toaster } from "@/components/ui/toaster";
import { AddFundsModal } from "@/components/AddFundsModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-7xl">
      <NavBar />
      <AddFundsModal />
      {children}
      <Toaster />
    </div>
  );
}
