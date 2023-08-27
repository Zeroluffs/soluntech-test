import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={"flex flex-col min-h-screen relative pb-20"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
