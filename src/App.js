import { Outlet } from "react-router-dom";
import { Flex } from '@chakra-ui/react';

function App() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      bg="var(--tg-theme-bg-color)"
      minHeight="100vh"
      paddingBottom="10"
      textColor="var(--tg-theme-text-color)"
    >
      <Outlet />
    </Flex>
  );
}

export default App;
