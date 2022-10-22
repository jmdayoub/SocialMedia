import axios from "axios";

const emailService = {
  endpoint: "https://api.remotebootcamp.dev/api/emails",
};

const send = (payload) => {
  const config = {
    method: "POST",
    url: emailService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { send };
