import Model from "@models/model";
import DTO from "@typing/http/DTO";

class Credentials extends Model {
  private _email: string;
  private _password: string;

  constructor() {
    super();
    this._email = this._password = "";
  }

  static fromForm(json: DTO): Credentials {
    const obj = new Credentials();
    obj._email = String(json["email"]);
    obj._password = String(json["password"]);
    return obj;
  }

  static fromJSON(json: DTO): Credentials {
    const obj = new Credentials();
    obj._email = String(json["email"]);
    obj._password = String(json["password"]);
    return obj;
  }

  override toJSON(): DTO {
    const dto = {} as DTO;
    dto["email"] = this._email;
    dto["password"] = this._password;
    return dto;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._email;
  }
}

export default Credentials;
