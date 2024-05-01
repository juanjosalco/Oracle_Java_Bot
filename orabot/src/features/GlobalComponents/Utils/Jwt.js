import { jwtDecode } from "jwt-decode";

export const decodeJwt = (token) => {
  return jwtDecode(token);
}