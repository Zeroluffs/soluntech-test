import { NavBar } from "./nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { AddFundsModal } from "@/components/add-funds-modal";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="container">
        <NavBar>
          {children}
          <AddFundsModal />
          <Toaster />
        </NavBar>
      </div>
    </>
  );
}
