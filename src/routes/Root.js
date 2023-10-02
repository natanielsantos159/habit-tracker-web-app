import logo from '../assets/logo.png';
import { Outlet } from "react-router-dom";
import { Flex, Image } from '@chakra-ui/react';
// const webApp = window.Telegram.WebApp;

function Root() {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      bg="var(--tg-theme-bg-color)"
      minHeight="100vh"
      paddingBottom="10"
    >
      <header>
        <Image src={logo} marginTop="2.5rem" alt="logo" width={200} />
      </header>
      <Outlet />
    </Flex>
  );
}

export default Root;
