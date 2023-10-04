import { createContext, useContext } from "react";

export const TelegramWebAppContext = createContext({});

export function TelegramWebAppProvider ({ children }) {
  const webApp = window.Telegram.WebApp;

  return (
    <TelegramWebAppContext.Provider value={{ webApp }}>
      {children}
    </TelegramWebAppContext.Provider>
  );
}

export function useTelegramWebApp() {
  const { webApp } = useContext(TelegramWebAppContext);
  return webApp;
}
