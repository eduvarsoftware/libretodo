import { useCallback, useEffect, useState } from "react";
import "./App.css";
import BoardArea from "./components/Board/BoardArea";
import Footer from "./components/Footer/Footer";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import Topbar from "./components/Topbar/Topbar";
import getLocalBoardData from "./functions/getLocalBoardData";
import api from "./functions/api";
import alertProc from "./functions/alertProc";

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [signUpLock, setSignUpLock] = useState(false);
  const [displayName, setDisplayNameActual] = useState(null);
  const [boardState, setBoardStateActual] = useState([]);
  const [loggedIn, setLoggedInActual] = useState(false);

  const setLoggedInWrapper = useCallback(
    (x) => {
      localStorage.setItem("LoggedIn", JSON.stringify(x));
      setLoggedInActual(x);
    },
    [setLoggedInActual]
  );

  const setDisplayNameWrapper = useCallback(
    (x) => {
      localStorage.setItem("DisplayName", JSON.stringify(x));
      setDisplayNameActual(x);
    },
    [setDisplayNameActual]
  );
  const setBoardStateWrapper = useCallback(
    (x) => {
      localStorage.setItem("BoardData", JSON.stringify(x));
      setBoardStateActual(x);
    },
    [setBoardStateActual]
  );

  useEffect(() => {
    const [localData, displayName, loggedIn] = getLocalBoardData();
    console.log(localData, displayName);
    if (localData) setBoardStateWrapper(localData);
    if (displayName) setDisplayNameWrapper(displayName);
    if (loggedIn) setLoggedInWrapper(loggedIn);
  }, [setBoardStateWrapper, setDisplayNameWrapper, setLoggedInWrapper]);

  const formInitialState = {
    username: "",
    password: "",
  };
  const [signUpFormState, setSignUpFormState] = useState(formInitialState);

  // synchronize locally stored pre login board data with server
  const sendLocalData = async () => {
    if (!boardState || boardState.length < 1) return;

    const prevBoardData = [...boardState].map((x) => ({
      listName: x.listName,
      listId: x.listId,
      listItems: x.listItems,
    }));
    await alertProc(api.batchCreateLists(prevBoardData));
  };

  const getServerData = async () => {
    const raw = await api.getAllLists();
    const res = (await raw.json())?.lists;
    const newState = res?.map((x) => ({ ...x, editingName: false }));
    return newState ? setBoardStateWrapper(newState) : null;
  };

  const syncBoardData = async () => {
    await sendLocalData();
    await getServerData();
  };

  const authRequest = () => {
    setSignUpLock(true);
    api
      .authenticate(signUpFormState)
      .then((r) => {
        if (r.status === 200) {
          console.log(r.status);
          r.json().then((j) => {
            localStorage.setItem("token", j.token);
            setLoggedInWrapper(true);
            setDisplayNameWrapper(j.username);
            setSignUpLock(false);
            setModalIsOpen(false);
            setSignUpFormState(formInitialState);
            syncBoardData();
          });
        } else {
          r.json().then((t) => {
            alert(`Error ${r.status} : ${t.message}`);
            setSignUpLock(false);
          });
        }
      })
      .catch((e) => {
        setSignUpLock(false);
        alert(`Error : ${e.toString()}`);
      });
  };

  const logoutUser = () => {
    setLoggedInWrapper(false);
    setDisplayNameWrapper(null);
    setBoardStateWrapper([]);
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="App">
      {modalIsOpen ? (
        <SignUpModal
          formState={signUpFormState}
          closeModal={() => setModalIsOpen(false)}
          signUpLock={signUpLock}
          onLogin={authRequest}
          onSignUp={authRequest}
          handleChange={(f, v) =>
            setSignUpFormState({ ...signUpFormState, [f]: v })
          }
        />
      ) : null}
      <Topbar
        openModal={() => setModalIsOpen(true)}
        loggedIn={loggedIn}
        displayName={displayName}
        logoutUser={logoutUser}
      />
      <BoardArea
        boardState={boardState}
        setBoardStateWrapper={setBoardStateWrapper}
      />
      <Footer />
    </div>
  );
}

export default App;
