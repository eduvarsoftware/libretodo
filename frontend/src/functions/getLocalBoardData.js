function getData(k) {
  const JSONDataRaw = localStorage.getItem(k);
  if (!JSONDataRaw) {
    return null;
  } else {
    try {
      let tmp = JSON.parse(JSONDataRaw);
      return tmp;
    } catch (e) {
      return null;
    }
  }
}

function getLocalBoardData() {
  return [getData("BoardData"), getData("DisplayName"), getData("LoggedIn")];
}

export default getLocalBoardData;
