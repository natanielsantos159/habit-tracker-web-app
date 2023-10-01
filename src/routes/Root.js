import logo from '../assets/logo.png';
import { Outlet } from "react-router-dom";

// const webApp = window.Telegram.WebApp;

function Root() {
  return (
    <div className='font-sans flex items-center flex-col mt-10 bg-[--tg-theme-bg-color]' >
      <header>
        <img src={logo} className="logo" alt="logo" />
        <Outlet />
      </header>
    </div>
  );
}

export default Root;
