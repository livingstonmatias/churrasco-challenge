const isAuth = async (to, from, next) => {
  const token = sessionStorage.getItem("token");
  const state = [null, undefined];
  if (!token || state.includes(token)) next("/login");
  next();
};

export default isAuth;
