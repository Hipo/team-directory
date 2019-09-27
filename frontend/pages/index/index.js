import React from "react";

import Layout from "../../components/layout/Layout";
import Grid from "../../components/grid/Grid";

import "./_index.scss";

function Home(props) {
  const {
    user,
    users
  } = props;

  return (
    <Layout user={user}>
      <Grid items={users}/>
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
    ],
    users: [
      {
        id: 1,
        avatar: "data:image/jpeg;base64,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",
        fullName: "Mucahit Tutuncu",
        team: "Frontend",
        birthDate: "28 June, 1997",
        oneLiners: [
          "Likes flying kites"
        ],
          currentProjects: [
            "Moment",
            "blogTO",
            "Moku"
        ],
          pastProjects: [
            "blogTO",
            "Moku"
        ]
      },
      {
        id: 2,
        avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
        fullName: "Mucahit Tutuncu",
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
        id: 3,
        avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
        fullName: "Mucahit Tutuncu",
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
        id: 4,
        avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
        fullName: "Mucahit Tutuncu",
        team: "Frontend",
        birthDate: "28 June, 1997",
        oneLiners: [
          "Likes flying kites",
          "Lives in Barcelona",
          "Eats too much chocolate"
        ],
          currentProjects: [
            "Moment",
            "blogTO"
        ],
          pastProjects: [
            "blogTO",
            "Moku"
        ]
      },
      {
        id: 5,
        avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
        fullName: "Mucahit Tutuncu",
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
        id: 6,
        avatar: "https://ca.slack-edge.com/T025D0M1W-UB5CGLR1B-4d1568dc7adf-512",
        fullName: "Mucahit Tutuncu",
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
    ]
  }
};

export default Home;
