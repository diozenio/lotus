import AuthAPI from "@api/auth";
import AuthService from "@services/AuthService";
import AuthMock from "infra/mock/auth";

class DIContainer {
  static getAuthUseCase() {
    return new AuthService(new AuthAPI());
  }
}

export default DIContainer;
