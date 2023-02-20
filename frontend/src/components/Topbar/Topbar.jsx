import TopbarUserInfo from "./TopbarUserInfo";
import TopbarTitle from "./TopbarTitle";

const Topbar = ({ openModal, loggedIn, displayName, logoutUser }) => {
  return (
    <div className="Topbar">
      <TopbarTitle />
      <TopbarUserInfo
        openModal={openModal}
        loggedIn={loggedIn}
        logoutUser={logoutUser}
        displayName={displayName}
      />
    </div>
  );
};

export default Topbar;
