import Model from "@models/model";
import DTO from "@typing/http/DTO";

class RefreshToken extends Model {
  private _id: string;
  private _userId: string;
  private _expiresIn: number;

  constructor() {
    super();
    this._id = this._userId = "";
    this._expiresIn = 0;
  }

  toJSON(): DTO {
    const dto = {} as DTO;
    dto["id"] = this._id;
    dto["userId"] = this._userId;
    dto["expiresIn"] = this._expiresIn;
    return dto;
  }

  static fromJSON(json: DTO): RefreshToken {
    const obj = new RefreshToken();
    obj._id = String(json["id"]);
    obj._userId = String(json["userId"]);
    obj._expiresIn = Number(json["expiresIn"]);
    return obj;
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }
}

export default RefreshToken;
