import createList from "./apiFunctions/listOps/createList";
import deleteList from "./apiFunctions/listOps/deleteList";
import batchCreateLists from "./apiFunctions/listOps/batchCreateLists";
import createListItem from "./apiFunctions/itemOps/createListItem";
import deleteListItem from "./apiFunctions/itemOps/deleteListItem";
import getAllLists from "./apiFunctions/listOps/getAllLists";
import authenticate from "./apiFunctions/userOps/authenticate";

const api = {
  authenticate,
  createList,
  batchCreateLists,
  deleteList,
  createListItem,
  deleteListItem,
  getAllLists,
};

export default api;
