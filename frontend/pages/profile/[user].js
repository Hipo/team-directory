import React from "react";

import Layout from "../../components/layout/Layout";

function User(props) {
  return (
    <Layout user={props.user}>
      <h1>Hello, {props.user.name}</h1>
    </Layout>
  )
}

User.getInitialProps = function ({query}) {
  return {
    user: {name:"temp"}
  }
}

export default User;
