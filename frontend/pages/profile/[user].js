import React, {useState} from "react";
import Router from "next/router"
import PropTypes from "prop-types";
import groupBy from "lodash/groupBy";

import Layout from "../../components/layout/Layout";
import Grid from "../../components/grid/Grid";
import CrossIcon from "../../static/assets/images/cross.svg";

import "./_user.scss";

function User({user, users, iceBreakerQuestions, projectList, teamList}) {
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
                 backgroundImage: `url(${user.avatar})`
               }}/>

          <div className={"user-profile-meta"}>
            {user.fullName.split(" ").map((item, index) => (
              <h1 key={index}
                  className={"user-profile-full-name"}>
                {item}
              </h1>
            ))}
            <h2 className={"user-profile-team"}>{user.team}</h2>
            <h2 className={"user-profile-birth-date"}>{user.birthDate}</h2>
          </div>
        </div>

        <div className={"user-profile-detailed-info"}>
          <div className={"user-profile-detailed-info-row"}>
            <div className="user-profile-detailed-info-row-title">
              {"ONE-LINERS"}
            </div>
            <div className={"user-profile-detailed-info-row-content"}>
              <ul>
                {user.oneLiners.map((item, index) => (
                  <li key={`one-liner-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={"user-profile-detailed-info-row"}>
            <div className="user-profile-detailed-info-row-title">
              {"WORKS ON"}
            </div>
            <div className={"user-profile-detailed-info-row-content"}>
              {user.currentProjects.join(", ")}
            </div>
          </div>

          <div className={"user-profile-detailed-info-row"}>
            <div className="user-profile-detailed-info-row-title">
              {"WORKED ON"}
            </div>
            <div className={"user-profile-detailed-info-row-content"}>
              {user.pastProjects.join(", ")}
            </div>
          </div>
        </div>

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

User.getInitialProps = function ({query}) {
  return {
   
  }
};

export default User;
