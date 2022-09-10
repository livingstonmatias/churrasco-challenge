const isNotAuth = (from, to, next) => {
  const token = sessionStorage.getItem("token");

  if (token) next("products");
  next();
};
export default isNotAuth;
