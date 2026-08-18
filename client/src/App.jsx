import { Navigate, Route, Routes } from "react-router-dom";

// ================= ADMIN =================

import AdminLayout from "./components/admin/AdminLayout";

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

// ================= APPLICANT =================

import ApplicantRegister from "./pages/applicant/ApplicantRegister";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";


function App() {
  return (
    <Routes>

      {/* =====================================================
          ADMIN LOGIN
      ===================================================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =====================================================
          ADMIN MODULE
      ===================================================== */}

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


        {/* Dashboard */}

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />


        {/* Job Posts */}

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


        {/* Categories */}

        <Route
          path="categories"
          element={<Categories />}
        />


        {/* Applications */}

        <Route
          path="applications"
          element={<Applications />}
        />

        <Route
          path="applications/:id"
          element={<ApplicationDetails />}
        />


        {/* Applicants */}

        <Route
          path="applicants"
          element={<Applicants />}
        />

        <Route
          path="applicants/:id"
          element={<ApplicantDetails />}
        />

      </Route>


      {/* =====================================================
          APPLICANT REGISTRATION
      ===================================================== */}

      <Route
        path="/applicant/register"
        element={<ApplicantRegister />}
      />


      {/* =====================================================
          APPLICANT MODULE
      ===================================================== */}

      <Route
        path="/applicant"
        element={
          <div className="app-layout">

            {/* Applicant Sidebar */}

            <Navbar />

            {/* Applicant Main Area */}

            <div className="main-area">

              {/* Applicant Header */}

              <header className="top-header">

                <div className="top-header-title">
                  Applicant Portal
                </div>

                <div className="top-header-user">

                  <div className="user-avatar">
                    AS
                  </div>

                  <div className="user-info">

                    <div className="user-name">
                      Aarav Sharma
                    </div>

                    <div className="user-role">
                      Applicant
                    </div>

                  </div>

                </div>

              </header>


              {/* Applicant Pages */}

              <main className="content-wrapper">

                <Routes>

                  <Route
                    index
                    element={<Home />}
                  />

                  <Route
                    path="jobs"
                    element={<Jobs />}
                  />

                  <Route
                    path="jobs/:id"
                    element={<JobDetails />}
                  />

                  <Route
                    path="apply/:jobId"
                    element={<ApplyJob />}
                  />

                  <Route
                    path="application-success"
                    element={<ApplicationSuccess />}
                  />

                  <Route
                    path="my-applications"
                    element={<MyApplications />}
                  />

                  <Route
                    path="applications/:id"
                    element={<ApplicationDetails />}
                  />

                  <Route
                    path="profile"
                    element={<Profile />}
                  />

                </Routes>

              </main>

              <Footer />

            </div>

          </div>
        }
      />


      {/* =====================================================
          DEFAULT
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/admin/login"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;