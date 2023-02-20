const isLoggedIn = () => (localStorage.getItem("token") ? true : false);

export default isLoggedIn;