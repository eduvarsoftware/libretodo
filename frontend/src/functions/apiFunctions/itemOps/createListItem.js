import sendApiRequest from "../../sendApiRequest";
import isLoggedIn from "../../isLoggedIn";

const createListItem = (listId, item) =>
  isLoggedIn() && listId
    ? sendApiRequest(`/lists/${listId}/items`, {
        method: "PUT",
        body: JSON.stringify({ item }),
      })
    : null;

export default createListItem;
