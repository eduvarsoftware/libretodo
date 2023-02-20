import config from "../config/config";

const resolve = (route) => `${config.apiBaseUrl}${route}`;

const checkToken = () =>
  localStorage.getItem("token")
    ? { Authorization: `token ${localStorage.getItem("token")}` }
    : {};

const getPresetOptions = () => ({
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    ...checkToken(),
  },
});

const sendApiRequest = (route, options = { mode: "cors" }) =>
  fetch(resolve(route), { ...getPresetOptions(), ...options });

export default sendApiRequest;
