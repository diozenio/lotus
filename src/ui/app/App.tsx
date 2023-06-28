import AuthProvider from "@contexts/auth/AuthProvider";
import DIContainer from "ui/dicontainer";
import Scaffold from "@components/Scaffold";
import "./global.scss";
import Routes from "@routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Scaffold>
        <AuthProvider service={DIContainer.getAuthUseCase()}>
          <Routes />
        </AuthProvider>
      </Scaffold>
    </BrowserRouter>
  );
}

export default App;
