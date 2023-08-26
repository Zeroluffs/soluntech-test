// components/PageWithTransition.tsx
import { useState, useEffect, useRef } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
const PageWithTransition = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const prevScreen = useRef(Component);
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    const handler = () => {
      setTransitioning(true);
      setTimeout(() => {
        prevScreen.current = Component;
        setTransitioning(false);
      }, 280);
    };
    router.events.on("routeChangeComplete", handler);
    return () => {
      router.events.off("routeChangeComplete", handler);
    };
  }, [Component, router.events]);
  const Loading = () => <div className="container mx-auto">Loading...</div>;

  const Screen = !transitioning ? Component : Loading;
  return (
    <div
      className={cn({
        "animate-slideUpEnter": !transitioning,
        // "animate-slideUpLeave": transitioning,
      })}
    >
      <Screen {...pageProps} />
    </div>
  );
};
export default PageWithTransition;
