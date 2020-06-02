import axios from "axios";

export const setAuthToken = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      config.headers["x-auth-token"] = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const deleteAuthToken = () => {
  delete axios.defaults.headers.common["x-auth-token"];
};
