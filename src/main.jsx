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
import Login from "./components/Login/Login.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";
import JobDetails from "./components/JobDetails/JobDetails.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import MyApplications from "./components/MyApplications/MyApplications.jsx";
import AllJobsPage from "./components/AdminPages/AllJobsPage.jsx";
import Users from "./components/AdminPages/Users.jsx";
import AdminLayout from "./AdminLayout.jsx";
import Dashboard from "./components/AdminPages/Dashboard.jsx";
import { SocketProvider } from "./Contexts/socketContext.jsx";
import Company from "./components/AdminPages/Company.jsx";
import Claims from "./components/AdminPages/Claims.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />} />
        <Route path="jobs" element={<JobPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="contactus" element={<ContactUs />} />
        <Route path="auth/callback" element={<AuthCallback />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="job/:jobId" element={<JobDetails />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<AllJobsPage />} />
        <Route path="users" element={<Users />} />
        <Route path="companies" element={<Company />} />
        <Route path="claims" element={<Claims />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </>
);
