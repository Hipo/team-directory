import Router from "next/router";

import "./_profile-row.scss";

function ProfileRow({user}) {
  function handleProfileRowClick() {
    Router.push(`/profile/${user.userName}`);
  }

  return (
    <div className={"profile-row"} onClick={handleProfileRowClick}>
      <h1 className={"profile-row-user-name"}>{user.fullName}</h1>
      <div className={"profile-row-photo"} style={{backgroundImage:`url(${user.avatar})`}}/>
    </div>
  )
}

export default ProfileRow;
