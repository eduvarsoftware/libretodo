import isLoggedIn from "./isLoggedIn";

const debugMode = true;

const alertProc = async (p) => {
  const res = await p;
  const showAlerts = isLoggedIn();
  if (res === null) return showAlerts ? alert("Error: Not Logged In") : null;
  else if (res.status !== 200)
    return showAlerts
      ? alert(`Error ${res.status} : ${await res.text()}`)
      : null;
  else return debugMode ? console.log("API call successful") || p : p;
};

export default alertProc;
