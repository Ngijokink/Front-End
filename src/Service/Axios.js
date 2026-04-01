import axios from "axios";

const api = axios.create({
  baseURL: "https://unbeaten-rarely-ardella.ngrok-free.dev/api",
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Request interceptor - Token:", token ? "Ada" : "TIDAK ADA");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization.substring(0, 20) + "...");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle response error (401 logout user)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 Unauthorized - Menghapus token dan redirect ke login");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const getProduct = (callback) => {
  api
  .get("/")
  .then((res) => {
    callback(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
};

export default api;