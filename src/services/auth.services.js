import { churrasco } from "./api.services";

function login({ username, password }) {
  return churrasco.post("login", { username, password }).then((res) => {
    sessionStorage.setItem("token", res.data.token);
    return res.data.token;
  });
}

function logout() {
  sessionStorage.removeItem("token");

  return Promise.resolve();
}

export { login, logout };
