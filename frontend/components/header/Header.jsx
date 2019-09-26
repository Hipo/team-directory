import Logo from "../../static/assets/images/hipo-logo.svg";

import "./_header.scss";

function Header() {
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
    </header>
  );
}

export default Header;
