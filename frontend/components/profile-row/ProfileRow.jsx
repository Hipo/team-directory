import Router from "next/router";

import "./_profile-row.scss";

function ProfileRow({user}) {
  function handleProfileRowClick() {
    Router.push(`/profile/me`)
  }

  return (
    <div className={"profile-row"} onClick={handleProfileRowClick}>
      <h1 className={"profile-row-user-name"}>{user.first_name} {user.last_name}</h1>
      <div className={"profile-row-avatar"} style={{backgroundImage:`url(${user.image})`}}/>
    </div>
  )
}

export default ProfileRow;
