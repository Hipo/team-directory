import "./_sidebar.scss"

import React, {useState} from "react";

import SidebarRow from "./sidebar-row/SidebarRow";

function Sidebar(props) {
  const [activeTab, setActiveTab] = useState("teams");
  const [sidebarList, setSidebarList] = useState(props.teamList);

  let teamsTabClassName = "sidebar-tab-name active";
  let projectsTabClassName = "sidebar-tab-name";

  function handleTeamsTabClick(){
    setSidebarList(props.teamList);
    setActiveTab("teams");
  }

  function handleProjectsTabClick(){
    setSidebarList(props.projectList);
    setActiveTab("projects");
  }

  if (activeTab === "projects"){
    teamsTabClassName = "sidebar-tab-name";
    projectsTabClassName = "sidebar-tab-name active";
  }

  return (
    <div className={"main-sidebar"}>
      <div className={"sidebar-tabs"}>
        <button type={"button"} onClick={handleTeamsTabClick} className={teamsTabClassName}>{"teams"}</button>
        <button type={"button"} onClick={handleProjectsTabClick} className={projectsTabClassName}>{"projects"}</button>
      </div>
      <div className={"sidebar-tab-items"}>
        <ul className={"sidebar-tab-items-container"}>
          {sidebarList.map((item, index)=>(
            <SidebarRow item={item} key={`sidebar-row-item-${index}`} isActive={false}/>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
