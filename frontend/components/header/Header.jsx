import Logo from "../../static/assets/images/hipo-logo.svg";

import "./_header.scss";

import SearchBox from "../search-box/SearchBox";

function Header() {
  return (
    <header className={"main-header"}>
      <div className={"main-header-logo-wrapper"}>
        <img src={Logo}
             className={"main-header-logo"}
             alt="Company Logo"/>

        <span className={"main-header-logo-wrapper-text"}>
          {"Agora"}
        </span>
      </div>
      <SearchBox/>

    </header>
  );
}

export default Header;
