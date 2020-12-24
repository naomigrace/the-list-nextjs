import { loginUser } from "./api";

export const handleLoginSubmit = async (
  event,
  setUsername,
  whichUser,
  pass,
  router
) => {
  event.preventDefault();
  const result = await loginUser(whichUser, pass);
  console.log("result", result);

  document.cookie = `jwt=${result.login.jwt}; path=/`;
  document.cookie = `user=${whichUser}; path=/`;
  setUsername(whichUser);
  router.push("/");
};

export const handleLogout = (setUsername, router) => {
  document.cookie = `jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;

  setUsername("");
  router.push("/login");
};
