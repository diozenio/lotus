import DTO from "@typing/http/DTO";
import Model from "@models/model";

class User extends Model {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor() {
    super();
    this._id = this._name = this._email = this._password = "";
  }

  static fromForm(json: DTO): User {
    const obj = new User();
    obj._name = String(json["name"]);
    obj._email = String(json["email"]);
    obj._password = String(json["password"]);
    return obj;
  }

  static fromJSON(json: DTO): User {
    const obj = new User();
    obj._id = String(json["id"]);
    obj._name = String(json["name"]);
    obj._email = String(json["email"]);
    obj._password = String(json["password"]);
    return obj;
  }

  override toJSON(): DTO {
    let dto = {} as DTO;
    dto["id"] = this._id;
    dto["name"] = this._name;
    dto["email"] = this._email;
    dto["password"] = this._password;
    return dto;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}

export default User;
