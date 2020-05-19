import axios from "axios";

export const setAuthToken = (token: any) => {
  axios.defaults.headers.common["x-auth-token"] = token;
};

export const deleteAuthToken = () => {
  delete axios.defaults.headers.common["x-auth-token"];
};
