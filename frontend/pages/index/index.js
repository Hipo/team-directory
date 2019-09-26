import React from "react";

import Layout from "../../components/layout/Layout";

import "./_index.scss";

function Home({user}) {
  return (
    <Layout user={user}>
      {"grid"}
    </Layout>
  )
}

Home.getInitialProps = () => {

  // `user` should be fetched from API
  return {
    user: {
      name: "John Doe"
    }
  }
};

export default Home;
