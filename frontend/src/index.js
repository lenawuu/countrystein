import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import Start from "./pages/Start";
import Game from "./pages/Game";
import End from "./pages/End";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/start",
    element: <Start />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/end",
    element: <End />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
