import DTO from "@typing/http/DTO";
import Model from "@models/model";
import RefreshToken from "./RefreshToken";

class AuthResponse extends Model {
  private _token: string;
  private _refreshToken?: RefreshToken;

  constructor() {
    super();
    this._token = "";
  }

  toJSON(): DTO {
    const dto = {} as DTO;
    dto["token"] = this._token;
    dto["refreshToken"] = this._refreshToken?.toJSON();
    return dto;
  }

  static fromJSON(json: DTO): AuthResponse {
    const obj = new AuthResponse();
    obj._token = String(json["token"]);
    if (json["refreshToken"]) {
      obj._refreshToken = RefreshToken.fromJSON(json["refreshToken"] as DTO);
    }
    return obj;
  }

  get token(): string {
    return this._token;
  }

  get refreshToken(): RefreshToken | undefined {
    return this._refreshToken;
  }
}

export default AuthResponse;
