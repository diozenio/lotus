import dayjs from "dayjs";

export function verifyRefreshTokenExpiration(expiresIn: number): Boolean {
  return dayjs().isAfter(dayjs.unix(expiresIn));
}
