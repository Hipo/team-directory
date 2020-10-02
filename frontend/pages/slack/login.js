import Spinner from "../../static/assets/spinner.svg";

import Head from "next/head";
import Router, { useRouter } from "next/router";

import "./_login.scss";
import { useEffect } from "react";
import { authenticate } from "../../api/api";

function SlackLogin() {
  const {query: {code}} = useRouter();

  useEffect(() => {
    if (code) {
      authenticate(code);
    }

    // if the request fails redirect to home page
    // Router.push(`/`)
  }, [code])

  return (
    <div className="slack-login-page">
      <Head>
        <title>{"Team Directory"}</title>
        <link href="https://fonts.googleapis.com/css?family=Hind:400,500,600,700&display=swap&subset=latin-ext"
              rel="stylesheet"/>
      </Head>

      <div className="page-body">
        <img src={Spinner}/>
        <h1>{"Loading..."}</h1>
      </div>
    </div>
  )
}
export default SlackLogin;