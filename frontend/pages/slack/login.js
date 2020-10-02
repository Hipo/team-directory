import Spinner from "../../static/assets/spinner.svg";

import { useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import {setCookie} from "nookies";

import "./_login.scss";
import { authenticate } from "../../api/api";

function SlackLogin() {
  const {query: {code}} = useRouter();

  useEffect(() => {
    if (code) {
      authenticate(code).then(response => {
        setCookie({}, "token", response.data.token, {
          path: '/',
        });

        Router.push(`/`)
      });
    }
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