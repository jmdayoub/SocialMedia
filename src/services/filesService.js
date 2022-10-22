import axios from "axios";

const filesService = {
  endpoint: "https://api.remotebootcamp.dev/api/files",
};

const addFile = (payload) => {
  const config = {
    method: "POST",
    url: filesService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios(config).then((response) => response.data.items);
};

export { addFile };
