import axios from "axios";

const eventsService = {
  endpoint: "https://localhost:50001/api/events",
};

const getPage = (pageIndex, pageSize) => {
  console.log("getEventsPage service function working");
  const config = {
    method: "GET",
    url: `${eventsService.endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

const addEvent = (payload) => {
  const config = {
    method: "POST",
    url: eventsService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response);
};

const updateEvent = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${eventsService.endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return {
      ...payload,
      id: id,
    };
  });
};

const searchGeo = (latitude, longitude, radius) => {
  console.log("Service search is working");
  const config = {
    method: "GET",
    url: `${eventsService.endpoint}/search/geo?latitude=${latitude}&longitude=${longitude}&distance=${radius}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.items[0]);
};

const searchEvents = (pageIndex, pageSize, dateStart, dateEnd) => {
  console.log("searchDate service is working");
  const config = {
    method: "GET",
    url: `${eventsService.endpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item.pagedItems);
};

export { getPage, addEvent, searchGeo, updateEvent, searchEvents };
