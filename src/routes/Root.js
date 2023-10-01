import logo from '../assets/logo.png';
import { Outlet } from "react-router-dom";

// const webApp = window.Telegram.WebApp;

function Root() {
  return (
    <div className='font-sans flex items-center flex-col bg-[--tg-theme-bg-color] min-h-screen pb-10' >
      <header>
        <img src={logo} className="mt-10" alt="logo" height={200} width={200}/>
      </header>
      <Outlet />
    </div>
  );
}

export default Root;
