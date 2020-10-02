import React, {useState} from "react";
import Router from "next/router"
import PropTypes from "prop-types";
import groupBy from "lodash/groupBy";

import Layout from "../../components/layout/Layout";
import Grid from "../../components/grid/Grid";
import CrossIcon from "../../static/assets/images/cross.svg";
import { getMyProfile, getUser, getUsers } from "../../api/api";
import withUser from "../../api/withUser";

import "./_user.scss";

function User({user, users = [], iceBreakerQuestions = [], projectList = [], teamList = []}) {
  const groupedQuestions = groupBy(iceBreakerQuestions, "category");
  const [activeQuestionCategory, setActiveQuestionCategory] = useState(Object.keys(groupedQuestions)[0]);

  function handleQuestionCategoryClick(key) {
    return () => setActiveQuestionCategory(key)
  }

  function handleBackdropClick() {
    Router.push("/");
  }


  return (
    <Layout user={user}
            projectList={projectList}
            teamList={teamList}>
      <Grid items={users}/>

      <div className={"user-profile-backdrop"}
           onClick={handleBackdropClick}/>
      <div className={"user-profile-section"}>
        <div className={"user-profile-section-close-button-container"}
             onClick={handleBackdropClick}>
          <img src={CrossIcon}
               className={"user-profile-section-close-button-icon"}
               alt="Cross"/>
        </div>

        <div className={"user-profile-avatar-and-meta"}>
          <div className={"user-profile-avatar"}
               style={{
                 backgroundImage: `url(${user.image})`
               }}/>

          <div className={"user-profile-meta"}>
            <h1 className={"user-profile-full-name"}>
              {user.first_name}
            </h1>
            <h1 className={"user-profile-full-name"}>
              {user.last_name}
            </h1>
            <h2 className={"user-profile-team"}>{user.team}</h2>
            <h2 className={"user-profile-birth-date"}>{user.birth_date}</h2>
          </div>
        </div>

        <div className={"user-profile-detailed-info"}>
          <div className={"user-profile-detailed-info-row"}>
            <div className="user-profile-detailed-info-row-title">
              {"ONE-LINERS"}
            </div>
            <div className={"user-profile-detailed-info-row-content"}>
              <ul>
                {user.one_liners.map((item, index) => (
                  <li key={`one-liner-${index}`}>{!!item && item.body}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={"user-profile-detailed-info-row"}>
            <div className="user-profile-detailed-info-row-title">
              {"WORKS ON"}
            </div>
            <div className={"user-profile-detailed-info-row-content"}>
              {user.projects.map((project) => (<span key={project.id}>{project.name}</span>))}
            </div>
          </div>

          <div className={"user-profile-detailed-info-row"}>
            <div className="user-profile-detailed-info-row-title">
              {"WORKED ON"}
            </div>
            <div className={"user-profile-detailed-info-row-content"}>
            {user.projects.map((project) => (<span key={project.id}>{project.name}</span>))}
            </div>
          </div>
        </div>

        {Boolean(Object.keys(groupedQuestions).length) && (
          <div className={"user-profile-questions-wrapper"}>
            <ul className={"user-profile-questions-categories"}>
              {Object.keys(groupedQuestions).map((key, index) => (
                <li className={key === activeQuestionCategory ? "active" : ""}
                    key={`category-item-${index}`}
                    onClick={handleQuestionCategoryClick(key)}>{key}</li>
              ))}
            </ul>


            <div className={"user-profile-questions-answers"}>
              {groupedQuestions[activeQuestionCategory].map((item, index) => (
                <div key={`category-item-${index}`}
                    className={"user-profile-questions-answer-item"}>
                  <div className={"user-profile-questions-answer-item-title"}>
                    {item.title}
                  </div>
                  <div className={"user-profile-questions-answer-item-content"}>
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  iceBreakerQuestions: PropTypes.array,
  projectList: PropTypes.array,
  teamList: PropTypes.array
};

User.getInitialProps = async function ({query}) {
  let user;

  if (query.user === "me") {
    const {data} = await getMyProfile();
    user = data;
  } else {
    const {data} = await getUser(query.user);
    user = data;
  }

  const {data: users} = await getUsers();

  return {
    user,
    users: users.results
  }
};

export default withUser(User);
