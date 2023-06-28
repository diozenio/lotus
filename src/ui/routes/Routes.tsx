import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import SignInPage from "@pages/Auth/SignIn";
import { useAuth } from "@contexts/auth/AuthCTX";
import SignUpPage from "@pages/Auth/SignUp";
import ForgotPasswordPage from "@pages/Auth/ForgotPassword";
import ChatPage from "@pages/Chat";
import Loading from "@components/Loading";

const PrivateRoutes = () => {
  const { user, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <Loading />;
  }

  if (user === null) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<ChatPage />} />
      </Route>
    </Router>
  );
};

export default Routes;
