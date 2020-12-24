import UserContext from "@/lib/context";
import "@/styles/index.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { useEffect, useState } from "react";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
Router.events.on("routeChangeComplete", () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState();

  useEffect(() => {
    const usernameValue = document.cookie
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("user"))
          .split("=")[1]
      : null;

    if (usernameValue) {
      setUsername(usernameValue);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      <Component {...pageProps} />;
    </UserContext.Provider>
  );
}

export default MyApp;
