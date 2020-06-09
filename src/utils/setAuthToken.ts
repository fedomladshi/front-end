import axios, { AxiosRequestConfig } from "axios";

export const setAuthToken = () => {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${(token)}`;
      }
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
