import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import myTheme from "./styles/theme"
import NewHabit from './routes/NewHabit';
import { withTelegramWebApp } from './components/TelegramWebApp';
import HabitDetail from './routes/HabitDetail';
import EditHabit from './routes/EditHabit';

const theme = extendTheme(myTheme)

const AppWithTelegramWebApp = withTelegramWebApp(App);
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithTelegramWebApp />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-habit",
        element: <NewHabit />,
      },
      {
        path: "/habits/:habitId",
        element: <HabitDetail />,
      },
      {
        path: "/habits/:habitId/edit",
        element: <EditHabit />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
