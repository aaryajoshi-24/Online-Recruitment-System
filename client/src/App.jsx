import { Navigate, Route, Routes } from "react-router-dom";

// Admin Layout
import AdminLayout from "./components/admin/AdminLayout";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import JobPosts from "./pages/admin/JobPosts";
import AddJob from "./pages/admin/AddJob";
import EditJob from "./pages/admin/EditJob";

import Categories from "./pages/admin/Categories";

import Applications from "./pages/admin/Applications";
import ApplicationDetails from "./pages/admin/ApplicationDetails";

import Applicants from "./pages/admin/Applicants";
import ApplicantDetails from "./pages/admin/ApplicantDetails";

// Applicant Pages
import ApplicantRegister from "./pages/applicant/ApplicantRegister";


function App() {
  return (
    <Routes>

      {/* ================= DEFAULT ================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/admin/login"
            replace
          />
        }
      />


      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* ================= ADMIN MODULE ================= */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        {/* /admin → /admin/dashboard */}

        <Route
          index
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />


        {/* ================= DASHBOARD ================= */}

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />


        {/* ================= JOB POSTS ================= */}

        <Route
          path="jobs"
          element={<JobPosts />}
        />

        <Route
          path="jobs/new"
          element={<AddJob />}
        />

        <Route
          path="jobs/edit/:id"
          element={<EditJob />}
        />


        {/* ================= CATEGORIES ================= */}

        <Route
          path="categories"
          element={<Categories />}
        />


        {/* ================= APPLICATIONS ================= */}

        <Route
          path="applications"
          element={<Applications />}
        />

        <Route
          path="applications/:id"
          element={<ApplicationDetails />}
        />


        {/* ================= APPLICANTS ================= */}

        <Route
          path="applicants"
          element={<Applicants />}
        />

        {/* Applicant Details */}

        <Route
          path="applicants/:id"
          element={<ApplicantDetails />}
        />

      </Route>


      {/* ================= APPLICANT REGISTRATION ================= */}

      <Route
        path="/applicant/register"
        element={<ApplicantRegister />}
      />


      {/* ================= TEMPORARY APPLICANT MODULE ================= */}

      <Route
        path="/applicant"
        element={
          <div className="container text-center mt-5">

            <h1>
              Applicant Module
            </h1>

            <p>
              Applicant module will be integrated here.
            </p>

          </div>
        }
      />

    </Routes>
  );
}

export default App;