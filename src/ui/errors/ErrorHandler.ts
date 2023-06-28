import { ErrorClassifier } from "./ErrorClassifier";
import { toast } from "react-toastify";

type LogoutFunction = () => void;

export class ErrorHandler {
  static handleError(error: unknown, logout: LogoutFunction) {
    const { message, shouldLogout } = ErrorClassifier.classifyError(error);

    if (shouldLogout) {
      logout();
    }

    toast.error(message);
  }
}
