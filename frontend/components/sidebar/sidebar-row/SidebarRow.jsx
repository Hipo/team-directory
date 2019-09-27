import "./_sidebar-row.scss"

import React, {useState} from "react";

function SidebarRow({item, isActive}){
    const [isItemActive, setActiveItem] = useState(isActive);
    let itemClassName = isActive ? "sidebar-row-title active" :"sidebar-row-title";

    function handleItemClick(){
        setActiveItem(!isItemActive);
    }

    if (isItemActive){
        itemClassName = "sidebar-row-title active";
    }

    return(
        <li className={"sidebar-row"}>
            <button type={"button"} className={itemClassName} onClick={handleItemClick}>{item.name}</button>
            <span className={"sidebar-row-count"}>{item.members}</span>
        </li>
    );
}

export default SidebarRow;