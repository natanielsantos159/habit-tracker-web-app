import { Outlet } from "react-router-dom";
import { Flex, Spinner } from '@chakra-ui/react';
import { useTelegramWebApp } from "./context/TelegramWebAppContext";

function App() {
  const { isReady } = useTelegramWebApp();
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      bg="var(--tg-theme-bg-color)"
      minHeight="100vh"
      paddingBottom="10"
      textColor="var(--tg-theme-text-color)"
    >
      { isReady ? <Outlet /> : <Spinner size='sm' /> }
    </Flex>
  );
}

export default App;
