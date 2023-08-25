import MainLayout from "@/components/MainLayout";
import { NavigationMenuDemo } from "@/components/NavMenu";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </ThemeProvider>
  );
}
