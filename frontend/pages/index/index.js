import React from "react";
import { parseCookies } from "nookies";

import Layout from "../../components/layout/Layout";
import Grid from "../../components/grid/Grid";
import { getMyProfile, getProjects, getTeams, getUsers } from "../../api/api";
import withUser from "../../api/withUser";

import "./_index.scss";

function Home(props) {
  const {
    user,
    users, 
    projects,
    teams
  } = props;

  return (
    <Layout user={user} projectList={projects} teamList={teams}>
      <Grid items={users}/>
    </Layout>
  )
}

Home.getInitialProps = async (context) => {
  const {token} = parseCookies(context);

  if (!token) {
    return {};
  }
  
  const {data: user} = await getMyProfile();
  const {data: users} = await getUsers();
  const {data: teams} = await getTeams();
  const {data: projects} = await getProjects();

  return {
    user,
    users: users.results,
    teams: teams.results,
    projects: projects.results
  }
};

export default withUser(Home);
