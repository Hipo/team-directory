import React from "react";

import Layout from "../../components/layout/Layout";

function User(props) {
  return (
    <Layout>
      <h1>Hello, {props.username}</h1>
    </Layout>
  )
}

User.getInitialProps = function ({query}) {
  return {
    username: query.user
  }
}

export default User;
