import axios from "axios";
const BASE_URL = process.env.VUE_APP_API_BASE_URL;
const BASE_UPLOAD_URL = process.env.VUE_APP_API_BASE_UPLOAD_URL;

const churrasco = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

churrasco.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

churrasco.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response.data;

    if (typeof message !== "object") return Promise.reject(message);

    return Promise.reject(
      message?.msg || "oops! we had problems processing your request"
    );
  }
);

const cloudinary = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

cloudinary.interceptors.request.use((config) => {
  config.url = BASE_UPLOAD_URL;

  return config;
});

export { churrasco, cloudinary };
