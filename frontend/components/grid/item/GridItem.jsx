import React, {Component} from "react";

import RightArrow from "../../../static/assets/images/right-arrow.svg";

import "./_grid-item.scss";

class GridItem extends Component {
  render() {
    const {item} = this.props;
    const {
      avatar,
      fullName,
      team,
      currentProjects,
      oneLiners
    } = item;

    return (
      <div className={"grid-item"}>
        <img src={avatar}
             className={"grid-item-image"}/>

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
            {oneLiners.map(oneLiner => (
              <li className={"grid-item-detail-one-liner-list-item"}>
                {oneLiner}
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
}

export default GridItem;
