import React from "react";
import Router from "next/router";

import RightArrow from "../../../static/assets/images/right-arrow.svg";

import "./_grid-item.scss";

function GridItem({item}) {
  const {
    id,
    image,
    first_name,
    last_name,
    team,
    projects,
    one_liners
  } = item;

  function handleGridItemClick() {
    Router.push(`/profile/[user]`, `/profile/${id}`)
  }


  return (
    <div className={"grid-item"}
         onClick={handleGridItemClick}
         style={{
           backgroundImage: `url(${image})`
         }}>

      <div className={"grid-item-name"}>
        {first_name} {last_name}
      </div>

      <div className={"grid-item-detail-container"}>
        <p className={"grid-item-detail-team"}>
          {team}
        </p>

        <p className={"grid-item-detail-current-projects"}>
          {projects.map((project) => (<span key={project.id} className={"grid-item-detail-current-projects-item"}>{project.name}</span>))}
        </p>

        <ul className={"grid-item-detail-one-liner-list"}>
          {one_liners.slice(0, 3).map(oneLiner => (
            <li className={"grid-item-detail-one-liner-list-item"}
                key={oneLiner && oneLiner.id}>
              <span className={"grid-item-detail-one-liner-list-item-bullet"}/>

              <p className={"grid-item-detail-one-liner-list-item-text"}>
                {!!oneLiner && oneLiner.body}
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
