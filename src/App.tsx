import React from "react";
import {
  // BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  RegisterForm,
  OtpVerification,
  LoginForm,
  ForgotPassword,
  ForgotPasswordOtp,
  ResetPassword,
} from "./pages";
import Dashboard from "./homepage/Dashboard";
import Community from "./homepage/responsive/app/Community";
import CommunityProfile from "./homepage/responsive/app-community-detail/CommunityProfile";
import CreatePollPopup from "./homepage/popup/CreatePollPopup";
import ProtectedRoute from "./ProtectedRoute";
import UserProfilePage from "./pages/UserProfile/UserProfilePage";
import CommunityInvitationHandler from "./pages/CommunityInvitation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user/sign_in" replace />} />

      <Route path="/user/sign_up" element={<RegisterForm />} />
      <Route path="/user/sign_in" element={<LoginForm />} />
      <Route path="/user/forgot_password" element={<ForgotPassword />} />
      <Route path="/test" element={<CreatePollPopup />} />
      <Route path="/auth/verification" element={<OtpVerification />} />
      <Route path="/user/reset_password" element={<ResetPassword />} />
      <Route
        path="/community/invite/:inviteLink"
        element={<CommunityInvitationHandler />}
      />
      <Route
        path="/auth/verify_forgot_password"
        element={<ForgotPasswordOtp />}
      />

      <Route
        path="/responsive"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communitydetail"
        element={
          <ProtectedRoute>
            <CommunityProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/community/:id"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/profile/:id"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
