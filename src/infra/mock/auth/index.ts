import AuthAdapter from "@interfaces/adapters/AuthAdapter";
import AuthResponse from "@models/auth/AuthResponse";
import Credentials from "@models/auth/Credentials";
import User from "@models/auth/User";
import RefreshToken from "@models/auth/RefreshToken";

class AuthMock extends AuthAdapter {
  async register(user: User): Promise<User> {
    return Promise.resolve(
      User.fromJSON({
        id: "04ceced2-209e-4dba-b142-9cc612b07798",
        name: "Dionísio",
        email: "dionisio@dionisio.com",
        password: "dionisio123",
      })
    );
  }

  async login(dto: Credentials): Promise<AuthResponse> {
    return await Promise.resolve(
      AuthResponse.fromJSON({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODc5NTc3OTIsImV4cCI6MTY4Nzk1ODY5Miwic3ViIjoiMDRjZWNlZDItMjA5ZS00ZGJhLWIxNDItOWNjNjEyYjA3Nzk4In0._61jKfWXNDI5bPpcZzKO2t7PbUAAh56lqZe_zYBsrGw",
        refreshToken: {
          id: "b96306ab-cc61-4fba-832a-af65471a5c30",
          expiresIn: 1690549792,
          userId: "04ceced2-209e-4dba-b142-9cc612b07798",
        },
      })
    );
  }

  async updateToken(refreshToken: RefreshToken): Promise<AuthResponse> {
    return Promise.resolve(
      AuthResponse.fromJSON({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODc5NTkxMzIsImV4cCI6MTY4Nzk2MDAzMiwic3ViIjoiMDRjZWNlZDItMjA5ZS00ZGJhLWIxNDItOWNjNjEyYjA3Nzk4In0.pBRasCs2VJxBsUXcgRCHdAr6k5oPfDv2-uR6Ml4RlS0",
        refreshToken: {
          id: "991e3e7a-14e7-44a6-b2ca-7cb5f97de993",
          expiresIn: 1687959135,
          userId: "04ceced2-209e-4dba-b142-9cc612b07798",
        },
      })
    );
  }

  override saveAuthorizationHeader(token: string): void {}

  override clearAuthorization(): void {}

  async logout(userId: string): Promise<void> {}

  async findUserById(userId: string): Promise<User> {
    return Promise.resolve(
      User.fromJSON({
        id: "04ceced2-209e-4dba-b142-9cc612b07798",
        name: "Dionísio",
        email: "dionisio@dionisio.com",
      })
    );
  }
}

export default AuthMock;
