import { createContext, useContext } from "react";

export const TelegramWebAppContext = createContext({});

export function useTelegramWebApp() {
  const { webApp, isReady } = useContext(TelegramWebAppContext);
  return { webApp, isReady };
}
