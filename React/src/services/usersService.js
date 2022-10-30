import axios from "axios";
// import { onGlobalSuccess } from "./serviceHelper";

const registerUser = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/register",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const login = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/users/current",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item.id);
};

const getUserById = (id) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return response.data.item;
  });
};

const logout = () => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/users/logout`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const usersService = {
  registerUser,
  login,
  getCurrentUser,
  getUserById,
  logout,
};
export default usersService;
