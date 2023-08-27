import { NavBar } from "./nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { AddFundsModal } from "@/components/add-funds-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative   mx-auto max-w-7xl">
        <NavBar />
        <AddFundsModal />
        {children}
        <Toaster />
      </div>
    </>
  );
}
