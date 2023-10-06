import { useEffect, useState } from "react";
import { TelegramWebAppContext } from "../context/TelegramWebAppContext";

export function TelegramWebApp({ children }) {
  const [isReady, setIsReady] = useState(false);

  const contextValues = {
    get webApp() {
      if (typeof window === 'undefined') {
        return undefined;
      }
      return window?.Telegram?.WebApp;
    },
    isReady,
  };

  const onReady = () => setIsReady(true);

  return (
    <TelegramWebAppScript onLoad={onReady}>
      <TelegramWebAppContext.Provider value={contextValues}>
        {children}
      </TelegramWebAppContext.Provider>
    </TelegramWebAppScript>
  );
}

export function withTelegramWebApp(Component) {
  return function WithTelegramWebApp(props) {
    return (
      <TelegramWebApp>
        <Component {...props} />
      </TelegramWebApp>
    );
  };
}

function TelegramWebAppScript({ children, onLoad }) {
  useEffect(() => {
    // Creates a script tag with the Telegram Web App script
    const webAppScript = document.createElement("script");
    webAppScript.src = "https://telegram.org/js/telegram-web-app.js";
    webAppScript.onload = onLoad;
    document.head.appendChild(webAppScript);
    return () => {
      document.head.removeChild(webAppScript);
    };
  }, []);

  return children;
}