import React from "react";

import Layout from "../../components/layout/Layout";
import Grid from "../../components/grid/Grid";

import "./_index.scss";

function Home(props) {
  const {
    user,
    users, projectList,teamList
  } = props;

  return (
    <Layout user={user} projectList={projectList} teamList={teamList}>
      <Grid items={users}/>
    </Layout>
  )
}

Home.getInitialProps = () => {
  // `user` should be fetched from API
  return {
  }
};

export default Home;
