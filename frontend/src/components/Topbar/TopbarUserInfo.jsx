import { Fragment } from "react";

const TopbarUserInfo = ({ openModal, loggedIn, displayName, logoutUser }) => {
  return (
    <div className="TopbarUserInfo" onClick={loggedIn ? null : openModal}>
      {loggedIn ? (
        <Fragment>
          Logged in as {displayName}
          <span onClick={loggedIn ? logoutUser : null}> (Logout)</span>
        </Fragment>
      ) : (
        <Fragment>
          <span>Login</span> to sync your data
        </Fragment>
      )}
    </div>
  );
};

export default TopbarUserInfo;
