import Cookies from "js-cookie";

export function getToken() {
  return Cookies.get("token");
}

export function isLoggedIn() {
  return !!getToken();
}

export function logout() {
  Cookies.remove("token");
}
