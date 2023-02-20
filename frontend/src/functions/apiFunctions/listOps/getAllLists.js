import isLoggedIn from "../../isLoggedIn";
import sendApiRequest from "../../sendApiRequest";

const getAllLists = () => (isLoggedIn() ? sendApiRequest("/lists") : null);

export default getAllLists;
