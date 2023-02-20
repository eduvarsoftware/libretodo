import sendApiRequest from "../../sendApiRequest";

const authenticate = (requestData) =>
  sendApiRequest("/users", {
    method: "POST",
    body: JSON.stringify(requestData),
  });

export default authenticate;
