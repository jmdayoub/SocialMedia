import axios from "axios";
import * as helper from "./serviceHelper";

const getPage = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `https://localhost:50001/api/v3/friends/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const addFriend = (payload) => {
  const config = {
    method: "POST",
    url: `https://localhost:50001/api/v3/friends/`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log("addFriend service function");
  return axios(config).then((response) => {
    return { ...payload, id: response.data.item };
  });
};

const updateFriend = (id, payload) => {
  const config = {
    method: "PUT",
    url: `https://localhost:50001/api/v3/friends/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log("updateFriend service function");
  return axios(config);
};

const getById = (id) => {
  console.log("getById service function", id);
  const config = {
    method: "GET",
    url: `https://localhost:50001/api/v3/friends/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return response;
  });
};

// On Success of that call you will need to set the response to state and map it to the page.
const searchFriends = (pageIndex, pageSize, query) => {
  console.log("searchFriends service function");
  const config = {
    method: "GET",
    url: `https://localhost:50001/api/v3/friends/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: `https://localhost:50001/api/v3/friends/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log("ajax delete call in the middle");
  return axios(config);
};

// const friendsService = {
//   getPage,
//   addFriend,
//   update,
//   getById,
//   search,
//   deleteById,
// };
// export default friendsService;

export { getPage, deleteById, addFriend, updateFriend, getById, searchFriends };
