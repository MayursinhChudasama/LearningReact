export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function authLoader() {
  return getAuthToken();
}
