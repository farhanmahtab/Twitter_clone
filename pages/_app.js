import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { app, firebaseConfig } from "@/helper/Firebase/FirebaseInit";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { useEffect } from "react";
import { onMessageListener } from "@/helper/Firebase/OnMessage";
import RecentMessageProvider from "@/providers/RecentMessageProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    return () => {};
  }, []);

  return (
    <SessionProvider session={session}>
      <RecentMessageProvider>
        <Component {...pageProps} />
      </RecentMessageProvider>
    </SessionProvider>
  );
}
