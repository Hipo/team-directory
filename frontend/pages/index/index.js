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
      avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
      fullName: "Mucahit Tutuncu",
      userName: "mucahit",
      team: "Frontend",
      birthDate: "28 June, 1997",
      oneLiners: [
        "Likes flying kites",
        "Lives in Barcelona",
        "Eats too much chocolate"
      ],
      currentProjects: [
        "Moment"
      ],
      pastProjects: [
        "blogTO",
        "Moku"
      ]
    },
    iceBreakerQuestions: [
      {
        title: "What do you like most about your job?",
        answer: "Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna.",
        category: "Hobbies"
      },
      {
        title: "1 What do you like most about your job?",
        answer: "2 Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna.",
        category: "Work Experience"
      },
      {
        title: "2 What do you like most about your job?",
        answer: "2 Nullam quis risus eget urna mollis ornare vel eu leo. Maecenas sed diam eget risus varius blandit sit amet non magna.",
        category: "Life style"
      }
    ]
  }
};

export default Home;
