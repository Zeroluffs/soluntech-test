import MainLayout from "@/components/MainLayout";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SubmissionProvider } from "@/context/submission";
import PageWithTransition from "@/components/page-with-transition";

export default function App(props: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <SubmissionProvider>
          <MainLayout>
            <PageWithTransition {...props} />
          </MainLayout>
        </SubmissionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
