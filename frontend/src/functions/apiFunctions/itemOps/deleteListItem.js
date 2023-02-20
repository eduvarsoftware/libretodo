import sendApiRequest from "../../sendApiRequest";
import isLoggedIn from "../../isLoggedIn";

const deleteListItem = (listId, item) =>
  isLoggedIn() && listId
    ? sendApiRequest(`/lists/${listId}/items`, {
        method: "DELETE",
        body: JSON.stringify({ item }),
      })
    : null;

export default deleteListItem;
