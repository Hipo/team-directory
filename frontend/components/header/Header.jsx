import Logo from "../../static/assets/images/hipo-logo.svg";

import "./_header.scss";

import SearchBox from "../search-box/SearchBox";
import ProfileRow from "../profile-row/ProfileRow";

function Header(props) {
  return (
    <header className={"main-header"}>
      <div className={"main-header-logo-wrapper"}>
        <img src={Logo}
             className={"main-header-logo"}
             alt="Company Logo"/>

        <span className={"main-header-logo-wrapper-text"}>
          {"team"}
        </span>
      </div>
      <SearchBox/>
      <ProfileRow user={props.user}/>
      
    </header>
  );
}

export default Header;
