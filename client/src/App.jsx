import { Navigate, Route, Routes } from "react-router-dom";

// ================= ADMIN =================

import AdminLayout from "./components/admin/AdminLayout";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobPosts from "./pages/admin/JobPosts";
import AddJob from "./pages/admin/AddJob";
import EditJob from "./pages/admin/EditJob";
import Categories from "./pages/admin/Categories";
import Applications from "./pages/admin/Applications";
import ApplicantApplicationDetails from "./pages/admin/ApplicationDetails";
import Applicants from "./pages/admin/Applicants";
import ApplicantDetails from "./pages/admin/ApplicantDetails";

// ================= ROLE SELECTION =================

import RoleSelection from "./pages/RoleSelection";

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
import ApplicationDetails from "./pages/ApplicationDetails";


// =====================================================
// APPLICANT LAYOUT
// =====================================================

function ApplicantLayout({ children }) {
  return (
    <div className="app-layout">

      <Navbar />

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


        {/* Applicant Page Content */}
        <main className="content-wrapper">
          {children}
        </main>


        <Footer />

      </div>

    </div>
  );
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <Routes>

      {/* =================================================
          ROLE SELECTION
      ================================================= */}

      <Route
        path="/"
        element={<RoleSelection />}
      />


      {/* =================================================
          ADMIN LOGIN
      ================================================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* =================================================
          ADMIN REGISTER
      ================================================= */}

      <Route
        path="/admin/register"
        element={<AdminRegister />}
      />


      {/* =================================================
          ADMIN MODULE
      ================================================= */}

      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

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

        <Route
          path="categories"
          element={<Categories />}
        />

        <Route
          path="applications"
          element={<Applications />}
        />

        <Route
          path="applications/:id"
          element={<ApplicantApplicationDetails />}
        />

        <Route
          path="applicants"
          element={<Applicants />}
        />

        <Route
          path="applicants/:id"
          element={<ApplicantDetails />}
        />

      </Route>


      {/* =================================================
          APPLICANT REGISTRATION
      ================================================= */}

      <Route
        path="/applicant/register"
        element={<ApplicantRegister />}
      />


      {/* =================================================
          APPLICANT HOME
      ================================================= */}

      <Route
        path="/applicant"
        element={
          <ApplicantLayout>
            <Home />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          APPLICANT JOBS
      ================================================= */}

      <Route
        path="/applicant/jobs"
        element={
          <ApplicantLayout>
            <Jobs />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          APPLICANT JOB DETAILS
      ================================================= */}

      <Route
        path="/applicant/jobs/:id"
        element={
          <ApplicantLayout>
            <JobDetails />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          APPLY FOR JOB
      ================================================= */}

      <Route
        path="/applicant/apply/:jobId"
        element={
          <ApplicantLayout>
            <ApplyJob />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          APPLICATION SUCCESS
      ================================================= */}

      <Route
        path="/applicant/application-success"
        element={
          <ApplicantLayout>
            <ApplicationSuccess />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          MY APPLICATIONS
      ================================================= */}

      <Route
        path="/applicant/my-applications"
        element={
          <ApplicantLayout>
            <MyApplications />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          APPLICANT APPLICATION DETAILS
      ================================================= */}

      <Route
        path="/applicant/applications/:id"
        element={
          <ApplicantLayout>
            <ApplicationDetails />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          APPLICANT PROFILE
      ================================================= */}

      <Route
        path="/applicant/profile"
        element={
          <ApplicantLayout>
            <Profile />
          </ApplicantLayout>
        }
      />


      {/* =================================================
          UNKNOWN ROUTES
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;