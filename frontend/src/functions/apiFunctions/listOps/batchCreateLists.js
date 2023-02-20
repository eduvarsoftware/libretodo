import isLoggedIn from "../../isLoggedIn";
import sendApiRequest from "../../sendApiRequest";

const batchCreateLists = (listData) =>
  isLoggedIn()
    ? sendApiRequest("/lists", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(listData),
      })
    : null;

export default batchCreateLists;
