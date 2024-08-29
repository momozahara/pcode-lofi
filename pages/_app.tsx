import "../styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.className}`}>
      <Component {...pageProps} />
    </div>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const { ctx, Component } = appContext;

  let pageProps = {
    //
  };
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (ctx.res?.statusCode === 404) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, {
        Location: "/",
      });
      ctx.res.end();
    }
  }

  return {
    pageProps,
  };
};

export default App;
