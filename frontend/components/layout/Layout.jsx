import Head from "next/head";
import PropTypes from "prop-types";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

import "./_layout.scss";
import withUser from "../../network/withUser";

function Layout(props) {
  return (
    <div className={"team-directory-app"}>
      <Head>
        <title>{props.metaTitle || "Team Directory"}</title>
        <link href="https://fonts.googleapis.com/css?family=Hind:400,500,600,700&display=swap&subset=latin-ext"
              rel="stylesheet"/>
      </Head>

      {props.user ? (
        <>
          <Header user={props.user}/>

          <div className={"team-directory-app-body"}>
            <Sidebar projectList={props.projectList} teamList={props.teamList}/>

            <div className={"team-directory-app-body-content"}>
              {props.children}
            </div>
          </div>
        </>
      ) : (
        <div className={"auth-section"}>
          <h3 className={"auth-section-title"}>{"Team Directory"}</h3>
          <a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=XXXX.XXXX">
            <img src="https://api.slack.com/img/sign_in_with_slack.png" />
          </a>
        </div>
      )}
    </div>
  )
}

Layout.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  metaTitle: PropTypes.string,
  projectList: PropTypes.array,
  teamList: PropTypes.array
};

export default withUser(Layout);
