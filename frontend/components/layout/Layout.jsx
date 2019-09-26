import Head from "next/head";

import "./_layout.scss";

function Layout(props) {
  return (
    <div className={"team-directory-app"}>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Hind:400,500,600,700&display=swap&subset=latin-ext"
              rel="stylesheet"/>
      </Head>
      <header>{"header"}</header>

      {props.children}
    </div>
  )
}

export default Layout;
