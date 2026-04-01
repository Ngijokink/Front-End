import axios from "axios";

const api = axios.create({
  baseURL: "https://unbeaten-rarely-ardella.ngrok-free.dev/api",
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

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