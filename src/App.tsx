import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { RegisterForm, LoginForm } from "./pages";
import Dashboard2 from "./homepage/Dashboard2";
import Community from "./homepage/responsive/app/Community";
import CreatePoll from "./homepage/responsive/app-community/CreatePoll";
import CommunityProfile from "./homepage/responsive/app-community-detail/CommunityProfile";
// "homepage": "https://lysreypov.github.io/pollify-app",

const App = () => {
  return (
    <RegisterForm />
    // <Routes>
    //   <Route path="/" element={<Navigate to="/user/sign_in" replace />} />
    //   <Route path="/community" element={<Dashboard2 />} />
    //   <Route path="/user/sign_up" element={<RegisterForm />} />
    //   <Route path="/user/sign_in" element={<LoginForm />} />
    //   <Route path="/responsive" element={<Community />} />
    //   <Route path="/createpoll" element={<CreatePoll />} />
    //   <Route path="/communitydetail" element={<CommunityProfile />} />
    // </Routes>
  );
};

export default App;
