import { unicodeCrossMark } from "../../constants/characters";
import "./SignUpModal.css";
const SignUpModal = ({
  closeModal,
  handleChange,
  signUpLock,
  onLogin,
  onSignUp,
  formState,
}) => {
  return (
    <div className="ModalRoot">
      <div className="ModalBox">
        <div onClick={closeModal} style={{ color: "black" }}>
          {unicodeCrossMark}
        </div>
        <div className="ModalFormContainer">
          <form className="ModalForm">
            <label htmlFor="UsernameInput">Username</label>
            <input
              id="UsernameInput"
              name="username"
              type="text"
              className="ModalInput"
              value={formState?.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            <label htmlFor="PasswordInput">Password</label>
            <input
              id="UsernameInput"
              name="username"
              type="password"
              className="ModalInput"
              value={formState?.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {!signUpLock ? (
              <div className="ModalButtonGroup">
                <button className="ModalButton" onClick={onLogin}>
                  Login
                </button>
                <button
                  className="ModalButton"
                  onClick={onSignUp}
                  type="submit"
                >
                  Signup
                </button>
              </div>
            ) : (
              <div>Please wait..</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
