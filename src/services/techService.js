import axios from "axios";

const techService = {
  endpoint: "https://localhost:50001/api/techcompanies",
};

const getCompanies = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${techService.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item.pagedItems);
};

const addCompany = (payload) => {
  const config = {
    method: "POST",
    url: `${techService.endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const updateCompany = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${techService.endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item.id);
};

const getById = (id) => {
  console.log("getById is executing", id);
  const config = {
    method: "GET",
    url: `${techService.endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

export { getCompanies, addCompany, updateCompany, getById };
