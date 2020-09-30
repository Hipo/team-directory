import React from "react";
import Router from "next/router";

import RightArrow from "../../../static/assets/images/right-arrow.svg";

import "./_grid-item.scss";

function GridItem({item}) {
  const {
    avatar,
    fullName,
    team,
    currentProjects,
    oneLiners,
    userName
  } = item;

  function handleGridItemClick() {
    Router.push(`/profile/[user]`, `/profile/${userName}`)
  }

  return (
    <div className={"grid-item"}
         onClick={handleGridItemClick}
         style={{
           backgroundImage: `url(${avatar})`
         }}>

      <div className={"grid-item-name"}>
        {fullName}
      </div>

      <div className={"grid-item-detail-container"}>
        <p className={"grid-item-detail-team"}>
          {team}
        </p>

        <p className={"grid-item-detail-current-projects"}>
          {currentProjects.join(", ")}
        </p>

        <ul className={"grid-item-detail-one-liner-list"}>
          {oneLiners.slice(0, 3).map(oneLiner => (
            <li className={"grid-item-detail-one-liner-list-item"}
                key={oneLiner}>
              <span className={"grid-item-detail-one-liner-list-item-bullet"}/>

              <p className={"grid-item-detail-one-liner-list-item-text"}>
                {oneLiner}
              </p>
            </li>
          ))}
        </ul>

        <img src={RightArrow}
             className={"grid-item-detail-right-arrow"}
             alt="Right arrow"/>
      </div>
    </div>
  )
}

export default GridItem;
