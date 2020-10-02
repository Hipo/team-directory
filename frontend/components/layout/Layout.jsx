import Head from "next/head";
import PropTypes from "prop-types";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import withUser from "../../api/withUser";

import "./_layout.scss";

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
          <a href="https://slack.com/oauth/v2/authorize?client_id=2183021064.777838605158&user_scope=users:read,users:read.email,team:read&redirect_uri=https://e56c76b0fac2.ngrok.io/slack/login">
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
