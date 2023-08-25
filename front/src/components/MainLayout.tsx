import { NavBar } from "./NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-7xl">
      <NavBar />
      {children}
    </div>
  );
}
