import axios from "axios";
import * as helper from "./serviceHelper";

const getPage = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `https://localhost:50001/api/jobs/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const addJob = (payload) => {
  console.log("addJob Service Function", payload);
  const config = {
    method: "POST",
    url: `https://localhost:50001/api/jobs/`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log("addJob service function");
  return axios(config).then((response) => {
    return { ...payload, id: response.data.item };
  });
};

const updateJob = (id, payload) => {
  const config = {
    method: "PUT",
    url: `https://localhost:50001/api/jobs/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log("updateJob service function");
  return axios(config);
};

const getById = (id) => {
  console.log("getById jobsService function", id);
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/jobs/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return response;
  });
};

const searchJobs = (pageIndex, pageSize, query) => {
  console.log("searchJobs service function");
  const config = {
    method: "GET",
    url: `https://localhost:50001/api/jobs/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

export { getPage, searchJobs, addJob, updateJob, getById };
