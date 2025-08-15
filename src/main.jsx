import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import JobPage from "./components/JobPage/JobPage.jsx";
import Register from "./components/Register/Register.jsx";
import AuthCallback from "./components/AuthSuccess/AuthCallback.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="jobs" element={<JobPage />} />
      <Route path="register" element={<Register />} />
      <Route path="auth/callback" element={<AuthCallback />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
