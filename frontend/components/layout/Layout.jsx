import Head from "next/head";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

import "./_layout.scss";

function Layout(props) {
  return (
    <div className={"team-directory-app"}>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Hind:400,500,600,700&display=swap&subset=latin-ext"
              rel="stylesheet"/>
      </Head>
      <Header/>

      <div className={"team-directory-app-body"}>
        <Sidebar/>

        <div className={"team-directory-app-body-content"}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
