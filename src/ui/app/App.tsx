import SignInPage from "@pages/Auth/SignIn";
import AuthProvider from "@contexts/auth/AuthProvider";
import DIContainer from "ui/dicontainer";
import Scaffold from "@components/Scaffold";
import "./global.scss";

function App() {
  return (
    <Scaffold>
      <AuthProvider service={DIContainer.getAuthUseCase()}>
        <SignInPage />
      </AuthProvider>
    </Scaffold>
  );
}

export default App;
