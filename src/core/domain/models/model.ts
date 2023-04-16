import DTO from "@typing/http/DTO";

abstract class Model {
  abstract toJSON(): DTO;

  static fromJSON(_: Record<string, unknown>): Model {
    throw new Error("you need to implement the fromJSON method");
  }

  static fromForm(_: Record<string, unknown>): Model {
    throw new Error("you need to implement the fromForm method");
  }
}

export default Model;
