import "./_profile-row.scss";

function ProfileRow(props) {
    return (
        <div className={"profile-row"}>
            <h1 className={"profile-row-user-name"}>{props.user.fullName}</h1>
            <div className={"profile-row-photo"} style={{backgroundImage:`url(${props.user.avatar})`}}/>
        </div>
    )
}

export default ProfileRow;