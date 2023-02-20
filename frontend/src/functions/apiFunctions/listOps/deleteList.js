import isLoggedIn from "../../isLoggedIn";
import sendApiRequest from "../../sendApiRequest";

const deleteList = async (listId) =>
  isLoggedIn() && listId
    ? sendApiRequest(`/lists/${listId}`, {
        method: "DELETE",
      })
    : null;

export default deleteList;
