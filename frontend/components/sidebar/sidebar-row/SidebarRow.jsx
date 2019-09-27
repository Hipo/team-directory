import "./_sidebar-row.scss"

function SidebarRow({item}){
    function handleItemClick(){
        console.log("item clicked");
    }

    return(
        <li className={"sidebar-row"}>
            <button className={"sidebar-row-title"} onClick={handleItemClick}>{item.name}</button>
            <span className={"sidebar-row-count"}>{item.members}</span>
        </li>
    );
}

export default SidebarRow;