import React from "react";
import axios from "axios"

import Layout from "../../components/layout/Layout";
import Grid from "../../components/grid/Grid";

import "./_index.scss";
import apiHandler from "../../network/apiHandler";

function Home(props) {
  if (props.token) {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    axios.defaults.headers['Authorization'] = `Token ${props.token}`;
  }

  console.log(axios.defaults);

  axios.get("/members/me/");

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

Home.getInitialProps = async ({query: {token}}) => {
  // console.log(user);

  // `user` should be fetched from API
  return {
    token,
    // user: {
    //   avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
    //   fullName: "Mucahit Tutuncu",
    //   userName: "mucahit",
    //   team: "Frontend",
    //   birthDate: "28 June, 1997",
    //   oneLiners: [
    //     "Likes flying kites",
    //     "Lives in Barcelona",
    //     "Eats too much chocolate"
    //   ],
    //   currentProjects: [
    //     "Moment"
    //   ],
    //   pastProjects: [
    //     "blogTO",
    //     "Moku"
    //   ]
    // },
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
    ],
    users: [
      {
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
      {
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
      {
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
      {
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
      {
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
      }
    ],
    projectList: [
      {
        members:[6],
        name:"Algorand"
      },
      {
        members:[5],
        name:"Moment"
      },
      {
        members:[2],
        name:"Wolarf"
      }
    ],
    teamList: [
      {
        members:[10],
        name:"Backend"
      },
      {
        members:[6],
        name:"Frontend"
      },
      {
        members:[4],
        name:"IOS"
      }
    ]
  }
};

export default Home;
