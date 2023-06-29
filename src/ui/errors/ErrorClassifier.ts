import { AxiosError } from "axios";
import { ErrorType } from "./types";

export class ErrorClassifier {
  static classifyError(error: unknown): {
    message: string;
    shouldLogout: boolean;
  } {
    let errorMessage = "Ocorreu um erro desconhecido";
    let shouldLogout = false;

    if (error instanceof Error && error !== null && "message" in error) {
      if (process.env.NODE_ENV === "development") console.error(error.message);

      switch (error.message) {
        case ErrorType.UnauthorizedError:
          errorMessage = "Você não tem permissão para acessar este recurso";
          shouldLogout = true;
          break;
        case ErrorType.WrongCredentialsError:
          errorMessage = "Usuário ou senha incorretos";
          break;
        case ErrorType.InvalidDataError:
          errorMessage = "Dados inválidos";
          break;
        case ErrorType.NetworkError:
          errorMessage = "Não foi possível conectar ao servidor";
          break;
      }
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return { message: errorMessage, shouldLogout };
  }
}
