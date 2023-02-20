import isLoggedIn from "../../isLoggedIn";
import sendApiRequest from "../../sendApiRequest";

const xfmt = (listObject) => ({
  listId: listObject.listId,
  listName: listObject.listName,
  listItems: listObject.listItems,
});

const createList = async (listObject) =>
  isLoggedIn()
    ? sendApiRequest("/lists", {
        method: "POST",
        body: JSON.stringify(xfmt(listObject)),
      })
    : null;

export default createList;
